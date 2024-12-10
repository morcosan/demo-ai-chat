import { getDbAccount } from '@api/services/db'
import { CreativityLevel, GptAPI, GptConfig, GptMessage } from '@api/types'
import OpenAI from 'openai'

type SystemMessage = OpenAI.ChatCompletionSystemMessageParam
type AssistantMessage = OpenAI.ChatCompletionAssistantMessageParam
type UserMessage = OpenAI.ChatCompletionUserMessageParam
type ChatModel = OpenAI.ChatModel

let client: OpenAI
let apiKey: string

const TEMPERATURE_MAP: Record<CreativityLevel, number> = {
	min: 0,
	low: 0.5,
	mid: 1,
	high: 1.5,
	max: 2,
}
const HISTORY_LIMIT = 20

export const createChatGPT = (model: ChatModel): GptAPI => {
	return {
		isAvailable: async () => Boolean(getDbAccount().openaiApiKey),

		async getResponse(config: GptConfig, messages: GptMessage[]): Promise<string> {
			try {
				if (!client || apiKey !== getDbAccount().openaiApiKey) {
					apiKey = getDbAccount().openaiApiKey
					client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
				}

				const payload: OpenAI.ChatCompletionCreateParamsNonStreaming = {
					model,
					messages: [
						{ role: 'system', content: config.prompt } satisfies SystemMessage,
						...messages.slice(-HISTORY_LIMIT).map((msg: GptMessage) => {
							return msg.role === 'agent'
								? ({ role: 'assistant', content: msg.text } satisfies AssistantMessage)
								: ({ role: 'user', content: msg.text } satisfies UserMessage)
						}),
					],
					temperature: TEMPERATURE_MAP[config.creativity],
				}
				const resp = await client.chat.completions.create(payload)

				return resp.choices[0].message.content || ''
				//
			} catch (error) {
				ERROR(error)
				return ''
			}
		},
	}
}
