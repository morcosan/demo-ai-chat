import { useContext } from 'react'
import { AiChatProvider, Context, Store } from './store.tsx'

export const useAiChatStore = () => useContext(Context)
export type AiChatStore = Store
export { AiChatProvider }
