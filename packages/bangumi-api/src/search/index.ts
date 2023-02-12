import { bangumiAxios } from '../axios'

export enum SubjectType {
  /**
   * 书籍
   */
  BOOK = 1,
  /**
   * 动画
   */
  ANIME = 2,
  /**
   * 音乐
   */
  MUSIC = 3,
  /**
   * 游戏
   */
  GAME = 4,
  /**
   * 三次元
   */
  REAL = 6,
}

export interface SearchParams {
  /**
   * 条目类型
   */
  type: SubjectType
  /**
   * 返回数据大小
   */
  responseGroup: 'small' | 'medium' | 'large'
  /**
   * 开始条数
   */
  start: number
  /**
   * 每页条数，最多25
   */
  max_results: number
}

export const search = () => {
  const subject = {
    /**
     * 条目搜索
     * @param keywords 关键词 URL Encode
     * @param params
     * @returns
     */
    async get(keywords: string, params: Partial<SearchParams> = {}) {
      const { data } = await bangumiAxios.get('/search/subject' + `/${keywords}`, { params })
      return data
    },
  }

  return {
    subject,
  }
}
