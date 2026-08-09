export * from './images'

export interface GridItem {
  title: string
  title_en: string
  /**
   * 示例
   */
  example?: string
  /**
   * 头像
   */
  avatar?: string
  name?: string

  // loading
  loading?: boolean
}

export const defaultGridItems: GridItem[] = [
  {
    title: '最想恋爱',
    title_en: 'Most Date',
  },
  {
    title: '最可爱',
    title_en: 'The Cutest',
    example: '',
  },
  {
    title: '最坚强',
    title_en: 'The Strongest',
    example: '梅花十三',
  },
  {
    title: '最治愈',
    title_en: 'Most cured',
  },
  {
    title: '最感动',
    title_en: 'Most Moved',
    example: '古河渚',
  },
  {
    title: '最想结婚',
    title_en: 'Most Married',
  },
  {
    title: '最虐心',
    title_en: 'Most Abusive',
  },
  {
    title: '最成熟',
    title_en: 'Most Mature',
  },
  {
    title: '最怀念',
    title_en: 'Most Missed',
  },
  {
    title: '最佳配音',
    title_en: 'Best Dubbing',
  },
  {
    title: '最元气',
    title_en: 'Most Energetic',
  },
  {
    title: '最援气',
    title_en: 'Most Erotic',
  },
  {
    title: '最体贴',
    title_en: 'Most Considerate',
    example: '蕾姆',
  },
  {
    title: '最离谱',
    title_en: 'Most Strangest',
    example: '满舰饰真子',
  },
  {
    title: '最讨厌',
    title_en: 'Most Hated',
  },
]

// 最中二
// 最独特

export const exampleItems = [
  {
    title: '最想恋爱',
    title_en: '最可爱',
  },
  {
    title: '最可爱',
    title_en: 'The Cutest',
  },
  {
    title: '最坚强',
    title_en: '最可爱',
  },
  {
    title: '最治愈',
    title_en: '最可爱',
  },
  {
    title: '最感动',
    title_en: '最可爱',
  },
  {
    title: '最想结婚',
    title_en: '最可爱',
  },
  {
    title: '最虐心',
    title_en: '最可爱',
  },
  {
    title: '最成熟',
    title_en: '最可爱',
  },
  {
    title: '最怀念',
    title_en: '最可爱',
    name: 'C.C.',
  },
  {
    title: '最可爱',
    title_en: '最可爱',
  },
  {
    title: '最元气',
    title_en: '最可爱',
  },
  {
    title: '最援气',
    title_en: '最可爱',
  },
  {
    title: '最离谱',
    title_en: '最可爱',
  },
  {
    title: '最过誉',
    title_en: '最可爱',
  },
  {
    title: '最讨厌',
    title_en: 'Most Hated',
  },
]
