import { useContext } from 'react'
import { AiChatTab, Context } from './_context'
import { AiChatProvider } from './_provider'

export const useAiChat = () => useContext(Context)
export { AiChatProvider, AiChatTab }
