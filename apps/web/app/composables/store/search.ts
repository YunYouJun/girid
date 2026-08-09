import type { CharacterInfo, Subject } from 'bangumi-api'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { bangumiApi } from '../../utils'

export const useSearchStore = defineStore('search', () => {
  // search anime firstly
  const keyword = ref('')

  const animationList = ref<Subject[]>([])
  animationList.value = Array.from({ length: 12 }).map(_ => ({
    id: 0,
    type: 2,
    name: '',
    name_cn: '',
    summary: '',
    images: {
      common: '',
      large: '',
      medium: '',
      small: '',
      grid: '',
    },
    air_date: '',
    air_weekday: 0,
  }))

  /**
   * choose in modal
   */
  const curAnimation = ref<Subject>()
  const characterList = ref<CharacterInfo[]>([])

  const setAnimation = async (item: Subject) => {
    if (!item.name)
      return

    curAnimation.value = item

    const results = await bangumiApi.subjects({ subject_id: item.id }).characters()
    characterList.value = results
  }

  const removeCurAnimation = () => {
    curAnimation.value = undefined
    characterList.value = []
  }

  return {
    keyword,
    curAnimation,

    animationList,
    characterList,

    setAnimation,
    removeCurAnimation,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSearchStore, import.meta.hot))
