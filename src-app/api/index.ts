import { mockAPI } from '@api/mock'
import { createCachedAPI } from '@app/api/partials/caching'

export { clearDataCache } from './partials/caching'
export * from './partials/types'

export const chatsAPI = createCachedAPI(mockAPI)
