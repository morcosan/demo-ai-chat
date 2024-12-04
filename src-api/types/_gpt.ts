export const GPT_ID__LOREM_IPSUM = 111
export const GPT_ID__RAMMUS = 222
export const GPT_ID__CHROME = 333

export const UI_TAG__GPT_DESCRIPTION = '{gpt_description}'

export interface GptAPI {
	isAvailable(): Promise<boolean>
	getResponse(config: GptConfig, messages: GptMessage[]): Promise<string>
}

export interface GptConfig {
	creativity: CreativityLevel
	prompt: string
}

export interface GptMessage {
	role: MessageRole
	text: string
}

export type MessageRole = 'user' | 'agent' | 'system'
export type CreativityLevel = 'min' | 'low' | 'mid' | 'high' | 'max'
