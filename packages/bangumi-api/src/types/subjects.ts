// export interface Subject {
//   staff: string
//   name: string
//   name_cn: string
//   image: string
//   id: number
// }

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

export interface Subject {
  id: number
  type: SubjectType
  name: string
  name_cn: string
  summary: string
  images: {
    common: string
    large: string
    medium: string
    small: string
    grid: string
  }
  air_date: string
  air_weekday: number
}
