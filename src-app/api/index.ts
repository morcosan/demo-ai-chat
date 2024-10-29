import { mockAPI } from '@api/mock'
import { createCachedAPI } from './_caching'

export { clearDataCache } from './_caching'
export * from './_types'

export const mainAPI = createCachedAPI(mockAPI)
