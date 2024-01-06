import { bangumiAxios } from '../axios'
import type { CharacterInfo, ImageType, Subject } from '../types'

export function subjects(params: {
  /**
   * subject id
   */
  subject_id: number
}) {
  const subjectId = params.subject_id
  const prefix = '/subjects'

  return {
    /**
     * get subject detail
     */
    get: async () => {
      const { data } = await bangumiAxios.get<CharacterInfo>(`${prefix}/${subjectId}`)
      return data
    },

    /**
     * get subject image
     */
    image: async (params: { type?: ImageType }) => {
      const { data } = await bangumiAxios.get<string>(`${prefix}/${subjectId}/image`, {
        params,
      })
      return data
    },

    /**
     * get subject related persons
     */
    persons: async () => {
      const { data } = await bangumiAxios.get<Subject>(`${prefix}/${subjectId}/persons`)
      return data
    },

    /**
     * get subject related characters
     */
    characters: async () => {
      const { data } = await bangumiAxios.get<CharacterInfo[]>(`${prefix}/${subjectId}/characters`)
      return data
    },
  }
}
