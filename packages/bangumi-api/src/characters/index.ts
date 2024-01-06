import { bangumiAxios } from '../axios'
import type { CharacterInfo, ImageType, Subject } from '../types'

export function characters(params: {
  /**
   * character id
   */
  character_id: number
}) {
  const characterId = params.character_id
  const prefix = '/characters'

  return {
    /**
     * get character detail
     */
    get: async () => {
      const { data } = await bangumiAxios.get<CharacterInfo>(`${prefix}/${characterId}`)
      return data
    },

    /**
     * get character image
     */
    image: async (params: { type?: ImageType }) => {
      const { data } = await bangumiAxios.get<string>(`${prefix}/${characterId}/image`, {
        params,
      })
      return data
    },

    /**
     * get character related subjects
     */
    subjects: async () => {
      const { data } = await bangumiAxios.get<Subject>(`${prefix}/${characterId}/subjects`)
      return data
    },

    /**
     * get character related person
     */
    persons: async () => {
      const { data } = await bangumiAxios.get(`${prefix}/${characterId}/persons`)
      return data
    },
  }
}
