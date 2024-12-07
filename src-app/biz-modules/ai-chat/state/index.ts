import { useContext } from 'react'
import { AgentsContext } from './_agents-store/context'
import { LayoutContext } from './_layout-store/context'
import { MultiStoreContext } from './_multi-store/context'
import { PreviewContext } from './_preview-store/context'
import { SearchContext } from './_search-store/context'

export const useAiChat = () => useContext(MultiStoreContext)
export const useAiChatAgents = () => useContext(AgentsContext)
export const useAiChatLayout = () => useContext(LayoutContext)
export const useAiChatPreview = () => useContext(PreviewContext)
export const useAiChatSearch = () => useContext(SearchContext)

export { EMPTY_AGENT } from './_agents-store/context'
export { AiChatView } from './_layout-store/context'
export { AiChatPreviewSource } from './_preview-store/context'
export { AiChatProvider } from './_provider'
export type { SearchResult } from './_search-store/context'
