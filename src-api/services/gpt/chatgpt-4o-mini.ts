import { GptAPI } from '@api/types'
import { createChatGptAPI } from './_chatgpt-api'

export const ChatGPT4oMini: GptAPI = createChatGptAPI('gpt-4o-mini')
