export * from './characters'
export * from './subjects'

export interface BangumiApiOptions {
  /**
   * Api Version
   * @default 'v0'
   */
  version: string
  /**
   * set headers['User-Agent']
   */
  userAgent: string
}
