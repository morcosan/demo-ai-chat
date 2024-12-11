export const GPT_ID = {
	LOREM_IPSUM_GPT: 111,
	RAMMUS_GPT: 222,
	CHROME_GPT: 333,
	CHATGPT_4O: 444,
	CHATGPT_4O_MINI: 555,
	CLAUDE_3_5_SONNET: 666,
	CLAUDE_3_5_HAIKU: 777,
}

export const DEV_GPT_IDS = [GPT_ID.LOREM_IPSUM_GPT, GPT_ID.RAMMUS_GPT]

export const UI_TAG__GPT_DESCRIPTION = '{gpt_description}'

export interface GptAPI {
	isAvailable(): Promise<boolean>
	getResponse(config: GptConfig, messages: GptMessage[]): Promise<GptResponse>
}

export interface GptConfig {
	creativity: CreativityLevel
	prompt: string
}

export interface GptMessage {
	role: MessageRole
	text: string
}

export interface GptResponse {
	text: string
	errorCode?: number
}

export type MessageRole = 'user' | 'agent' | 'system'
export type CreativityLevel = 'min' | 'low' | 'mid' | 'high' | 'max'
