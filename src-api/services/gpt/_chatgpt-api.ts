import { getDbAccount } from '@api/services/db'
import { CreativityLevel, GptAPI, GptConfig, GptMessage, GptResponse } from '@api/types'
import OpenAI, { APIError } from 'openai'

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

export const createChatGptAPI = (model: Model): GptAPI => {
	return {
		async isAvailable() {
			return Boolean(getDbAccount().openaiApiKey)
		},

		async getResponse(config: GptConfig, messages: GptMessage[]): Promise<GptResponse> {
			messages = messages.slice(-HISTORY_LIMIT)

			try {
				const apiKey = getDbAccount().openaiApiKey

				if (!_client || _apiKey !== apiKey) {
					_apiKey = apiKey
					_client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
				}

				const payload: Payload = {
					model,
					temperature: CREATIVITY_MAP[config.creativity],
					messages: [
						{ role: 'system', content: config.prompt } satisfies Message,
						...messages.map((msg: GptMessage) => {
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
