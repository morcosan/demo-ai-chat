import Anthropic, { APIError } from '@anthropic-ai/sdk'
import Types from '@anthropic-ai/sdk/resources/messages'
import { getDbAccount } from '@api/services/db'
import { CreativityLevel, GptAPI, GptConfig, GptMessage, GptResponse } from '@api/types'

type Message = Types.MessageParam
type Model = Types.Model
type Payload = Types.MessageCreateParamsNonStreaming
type TextBlock = Types.TextBlock

const HISTORY_LIMIT = 20
const CREATIVITY_MAP: Record<CreativityLevel, number> = {
	min: 0,
	low: 0.25,
	mid: 0.5,
	high: 0.75,
	max: 1,
}

let _client: Anthropic
let _apiKey: string

export const createClaudeAPI = (model: Model): GptAPI => {
	return {
		async isAvailable() {
			return Boolean(getDbAccount().anthropicApiKey)
		},

		async getResponse(config: GptConfig, messages: GptMessage[]): Promise<GptResponse> {
			messages = messages.slice(-HISTORY_LIMIT)

			try {
				const apiKey = getDbAccount().anthropicApiKey

				if (!_client || _apiKey !== apiKey) {
					_apiKey = apiKey
					_client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
				}

				const payload: Payload = {
					model,
					max_tokens: 8192, // Default, but required
					temperature: CREATIVITY_MAP[config.creativity],
					system: config.prompt,
					messages: messages.map((msg: GptMessage) => {
						return msg.role === 'agent'
							? ({ role: 'assistant', content: msg.text } satisfies Message)
							: ({ role: 'user', content: msg.text } satisfies Message)
					}),
				}
				const resp = await _client.messages.create(payload)
				const text = (resp.content[0] as TextBlock).text || ''

				return { text }
				//
			} catch (error) {
				return { text: '', errorCode: (error as APIError).status }
			}
		},
	}
}
