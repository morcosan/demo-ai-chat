import { GptAPI } from '@api/types'
import { createChatGPT } from './_chatgpt-base'

export const ChatGPT4oMini: GptAPI = createChatGPT('gpt-4o-mini')
