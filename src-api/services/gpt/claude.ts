import Anthropic, { APIError } from '@anthropic-ai/sdk'
import {
	MessageParam as Message,
	Model,
	MessageCreateParamsNonStreaming as Payload,
	TextBlock,
} from '@anthropic-ai/sdk/resources/messages'
import { getDbAccount } from '@api/services/db'
import { CreativityLevel, GPT_RESP__UNAVAILABLE, GptAPI, GptConfig, GptMessage, GptResponse } from '@api/types'
import { SYSTEM_PROMPTS } from './_prompts'

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

const _createGptAPI = (model: Model): GptAPI => {
	return {
		async isAvailable() {
			return Boolean(getDbAccount().anthropicApiKey)
		},

		async getResponse(config: GptConfig, messages: GptMessage[]): Promise<GptResponse> {
			const apiKey = getDbAccount().anthropicApiKey
			if (!apiKey) return GPT_RESP__UNAVAILABLE

			try {
				if (!_client || _apiKey !== apiKey) {
					_apiKey = apiKey
					_client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })
				}

				const systemPrompt = SYSTEM_PROMPTS.reduce((acc, text) => acc + text + '\n', '') + config.prompt

				const payload: Payload = {
					model,
					max_tokens: 8192, // Default, but required
					temperature: CREATIVITY_MAP[config.creativity],
					system: systemPrompt,
					messages: messages.slice(-HISTORY_LIMIT).map((msg: GptMessage) => {
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

export const Claude35Haiku: GptAPI = _createGptAPI('claude-3-5-haiku-latest')
export const Claude35Sonnet: GptAPI = _createGptAPI('claude-3-5-sonnet-latest')
