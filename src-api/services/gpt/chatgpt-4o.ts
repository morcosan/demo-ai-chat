import { GptAPI } from '@api/types'
import { createChatGptAPI } from './_chatgpt-api'

export const ChatGPT4o: GptAPI = createChatGptAPI('chatgpt-4o-latest')
