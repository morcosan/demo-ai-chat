import { GptAPI } from '@api/types'
import { createChatGPT } from './_chatgpt-base'

export const ChatGPT4o: GptAPI = createChatGPT('chatgpt-4o-latest')
