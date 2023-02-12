export interface CharacterInfo {
  id: number
  name: string
  type: string
  images: CharacterImages
  /**
   * 性别
   */
  gender: string
}

export interface CharacterImages {
  large: string
  medium: string
  /**
   * medium > grid > small
   */
  grid: string
  small: string
}

/**
 * image size
 */
export type ImageType = 'small' | 'grid' | 'medium' | 'large'
