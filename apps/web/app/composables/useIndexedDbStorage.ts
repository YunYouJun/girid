import type { Ref } from 'vue'
import { readonly, ref, shallowRef, watch } from 'vue'

const databaseName = 'girid'
const databaseVersion = 1
const objectStoreName = 'drafts'

let databasePromise: Promise<IDBDatabase> | undefined

function cloneJsonValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

function openDatabase() {
  databasePromise ||= new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(databaseName, databaseVersion)

    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(objectStoreName))
        request.result.createObjectStore(objectStoreName)
    }

    request.onsuccess = () => {
      request.result.onversionchange = () => request.result.close()
      resolve(request.result)
    }
    request.onerror = () => reject(request.error)
  })

  return databasePromise
}

async function readIndexedDbValue<T>(key: string) {
  const database = await openDatabase()
  return await new Promise<T | undefined>((resolve, reject) => {
    const transaction = database.transaction(objectStoreName, 'readonly')
    const request = transaction.objectStore(objectStoreName).get(key)

    request.onsuccess = () => resolve(request.result as T | undefined)
    request.onerror = () => reject(request.error)
  })
}

async function writeIndexedDbValue<T>(key: string, value: T) {
  const database = await openDatabase()
  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(objectStoreName, 'readwrite')
    transaction.objectStore(objectStoreName).put(value, key)
    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
    transaction.onabort = () => reject(transaction.error)
  })
}

/**
 * Persist JSON-safe state in IndexedDB and migrate the previous localStorage
 * value after the first successful database write. localStorage remains a
 * fallback for browsers where IndexedDB is unavailable.
 */
export function useIndexedDbStorage<T>(key: string, initialValue: T) {
  const state = ref(cloneJsonValue(initialValue)) as Ref<T>
  const isReady = shallowRef(!import.meta.client)

  if (!import.meta.client) {
    return {
      state,
      isReady: readonly(isReady),
    }
  }

  let applyingStoredValue = false
  let hasPendingValue = false
  let pendingValue: T | undefined
  let indexedDbAvailable = 'indexedDB' in window
  let writeQueue = Promise.resolve()

  function readLegacyValue() {
    try {
      const value = localStorage.getItem(key)
      if (!value)
        return undefined

      return JSON.parse(value) as T
    }
    catch {
      return undefined
    }
  }

  function persist(value: T, removeLegacyAfterWrite = false) {
    const snapshot = cloneJsonValue(value)
    writeQueue = writeQueue.catch(() => {}).then(async () => {
      if (indexedDbAvailable) {
        try {
          await writeIndexedDbValue(key, snapshot)
          if (removeLegacyAfterWrite) {
            try {
              localStorage.removeItem(key)
            }
            catch {}
          }
          return
        }
        catch {
          indexedDbAvailable = false
          databasePromise = undefined
        }
      }

      try {
        localStorage.setItem(key, JSON.stringify(snapshot))
      }
      catch {}
    })
  }

  watch(state, (value) => {
    if (applyingStoredValue)
      return

    if (!isReady.value) {
      hasPendingValue = true
      pendingValue = cloneJsonValue(value)
      return
    }

    persist(value)
  }, { deep: true, flush: 'sync' })

  void (async () => {
    const legacyValue = readLegacyValue()
    let storedValue: T | undefined

    if (indexedDbAvailable) {
      try {
        storedValue = await readIndexedDbValue<T>(key)
      }
      catch {
        indexedDbAvailable = false
        databasePromise = undefined
      }
    }

    const restoredValue = storedValue ?? legacyValue
    if (!hasPendingValue && restoredValue !== undefined) {
      applyingStoredValue = true
      state.value = cloneJsonValue(restoredValue)
      applyingStoredValue = false
    }

    isReady.value = true

    if (hasPendingValue && pendingValue !== undefined)
      persist(pendingValue, legacyValue !== undefined)
    else if (storedValue === undefined && legacyValue !== undefined)
      persist(legacyValue, true)
  })()

  return {
    state,
    isReady: readonly(isReady),
  }
}
