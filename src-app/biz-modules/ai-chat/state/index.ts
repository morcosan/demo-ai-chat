import { useContext } from 'react'
import { AiChatProvider, Context } from './provider.tsx'

export const useAiChat = () => useContext(Context)
export { AiChatProvider }
