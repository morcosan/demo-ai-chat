import { useContext } from 'react'
import { AiChatProvider, Context } from './store.tsx'

export const useAiChat = () => useContext(Context)
export { AiChatProvider }
