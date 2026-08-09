import type { GridItem } from '../utils'
import { storeToRefs } from 'pinia'
import { shallowRef } from 'vue'

type SettingsDataStatus = 'idle' | 'exported' | 'imported' | 'reset' | 'error'

interface GridBackup {
  rows: number
  cols: number
  items: GridItem[]
}

interface GiridBackup {
  schemaVersion: 1
  exportedAt: string
  girid: GridBackup
  friends: GridBackup
}

function cloneGridItems(items: GridItem[]) {
  return JSON.parse(JSON.stringify(items)) as GridItem[]
}

function isGridItem(value: unknown): value is GridItem {
  if (!value || typeof value !== 'object')
    return false

  const item = value as Record<string, unknown>
  return typeof item.title === 'string'
    && typeof item.title_en === 'string'
    && (item.example === undefined || typeof item.example === 'string')
    && (item.avatar === undefined || typeof item.avatar === 'string')
    && (item.name === undefined || typeof item.name === 'string')
}

function isGridBackup(value: unknown): value is GridBackup {
  if (!value || typeof value !== 'object')
    return false

  const grid = value as Record<string, unknown>
  return Number.isInteger(grid.rows)
    && Number(grid.rows) >= 1
    && Number(grid.rows) <= 10
    && Number.isInteger(grid.cols)
    && Number(grid.cols) >= 1
    && Number(grid.cols) <= 10
    && Array.isArray(grid.items)
    && grid.items.every(isGridItem)
}

function isGiridBackup(value: unknown): value is GiridBackup {
  if (!value || typeof value !== 'object')
    return false

  const backup = value as Record<string, unknown>
  return backup.schemaVersion === 1
    && typeof backup.exportedAt === 'string'
    && isGridBackup(backup.girid)
    && isGridBackup(backup.friends)
}

export function useSettingsData() {
  const girid = useGiridStore()
  const friend = useFriendStore()
  const {
    cols: giridCols,
    rows: giridRows,
    userGridItems,
  } = storeToRefs(girid)
  const {
    cols: friendCols,
    gridItems: friendGridItems,
    rows: friendRows,
  } = storeToRefs(friend)
  const status = shallowRef<SettingsDataStatus>('idle')

  function createBackup(): GiridBackup {
    return {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      girid: {
        rows: giridRows.value,
        cols: giridCols.value,
        items: cloneGridItems(userGridItems.value),
      },
      friends: {
        rows: friendRows.value,
        cols: friendCols.value,
        items: cloneGridItems(friendGridItems.value),
      },
    }
  }

  function exportBackup() {
    if (!import.meta.client)
      return

    const blob = new Blob([JSON.stringify(createBackup(), null, 2)], {
      type: 'application/json',
    })
    const link = document.createElement('a')
    const date = new Date().toISOString().slice(0, 10)
    const url = URL.createObjectURL(blob)
    link.href = url
    link.download = `girid-backup-${date}.json`
    document.body.append(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1_000)
    status.value = 'exported'
  }

  async function importBackup(file: File) {
    try {
      const parsed: unknown = JSON.parse(await file.text())
      if (!isGiridBackup(parsed))
        throw new Error('Invalid Girid backup')

      giridRows.value = parsed.girid.rows
      giridCols.value = parsed.girid.cols
      userGridItems.value = structuredClone(parsed.girid.items)
      friendRows.value = parsed.friends.rows
      friendCols.value = parsed.friends.cols
      friendGridItems.value = structuredClone(parsed.friends.items)
      status.value = 'imported'
    }
    catch {
      status.value = 'error'
    }
  }

  function resetDrafts() {
    giridRows.value = 3
    giridCols.value = 5
    girid.reset()
    friendRows.value = 3
    friendCols.value = 5
    friend.reset()
    status.value = 'reset'
  }

  return {
    exportBackup,
    importBackup,
    resetDrafts,
    status,
  }
}
