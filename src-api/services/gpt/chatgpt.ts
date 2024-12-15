import { getDbAccount } from '@api/services/db'
import { CreativityLevel, GPT_RESP__UNAVAILABLE, GptAPI, GptConfig, GptMessage, GptResponse } from '@api/types'
import OpenAI, { APIError } from 'openai'
import { SYSTEM_PROMPTS } from './_prompts'

type Model = OpenAI.ChatModel
type Payload = OpenAI.ChatCompletionCreateParamsNonStreaming
type Message =
	| OpenAI.ChatCompletionUserMessageParam
	| OpenAI.ChatCompletionSystemMessageParam
	| OpenAI.ChatCompletionAssistantMessageParam

const HISTORY_LIMIT = 20
const CREATIVITY_MAP: Record<CreativityLevel, number> = {
	min: 0,
	low: 0.5,
	mid: 1,
	high: 1.5,
	max: 2,
}

let _client: OpenAI
let _apiKey: string

const _createGptAPI = (model: Model): GptAPI => {
	return {
		async isAvailable() {
			return Boolean(getDbAccount().openaiApiKey)
		},

		async getResponse(config: GptConfig, messages: GptMessage[]): Promise<GptResponse> {
			const apiKey = getDbAccount().openaiApiKey
			if (!apiKey) return GPT_RESP__UNAVAILABLE

			try {
				if (!_client || _apiKey !== apiKey) {
					_apiKey = apiKey
					_client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
				}

				const systemPrompt: Message = {
					role: 'system',
					content: SYSTEM_PROMPTS.reduce((acc, text) => acc + text + '\n', '') + config.prompt,
				}

				const payload: Payload = {
					model,
					temperature: CREATIVITY_MAP[config.creativity],
					messages: [
						systemPrompt,
						...messages.slice(-HISTORY_LIMIT).map((msg: GptMessage) => {
							return msg.role === 'agent'
								? ({ role: 'assistant', content: msg.text } satisfies Message)
								: ({ role: 'user', content: msg.text } satisfies Message)
						}),
					],
				}
				const resp = await _client.chat.completions.create(payload)
				const text = resp.choices[0].message.content || ''

				return { text }
				//
			} catch (error) {
				return { text: '', errorCode: (error as APIError).status }
			}
		},
	}
}

export const ChatGPT4o: GptAPI = _createGptAPI('chatgpt-4o-latest')
export const ChatGPT4oMini: GptAPI = _createGptAPI('gpt-4o-mini')
