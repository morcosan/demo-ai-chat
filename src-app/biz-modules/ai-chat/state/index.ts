import { useContext } from 'react'
import { AgentsContext } from './_agents-store/context'
import { LayoutContext } from './_layout-store/context'
import { MultiStoreContext } from './_multi-store/context'
import { SearchContext } from './_search-store/context'

export const useAiChat = () => useContext(MultiStoreContext)
export const useAiChatLayout = () => useContext(LayoutContext)
export const useAiChatSearch = () => useContext(SearchContext)
export const useAiChatAgents = () => useContext(AgentsContext)

export { AGENT_EMPTY } from './_agents-store/context'
export { AiChatView } from './_layout-store/context'
export { AiChatProvider } from './_provider'
export type { SearchResult } from './_search-store/context'
