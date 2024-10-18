import { useContext } from 'react'
import { AiChatView, Context } from './_context'
import { AiChatProvider } from './_provider'

export const useAiChat = () => useContext(Context)

export type { SearchResult } from './stores/search-store'
export { AiChatProvider, AiChatView }
