import { useContext } from 'react'
import { AiChatProvider, Context } from './provider'

export const useAiChat = () => useContext(Context)
export { AiChatProvider }
