export const GPT_ID__LOREM_IPSUM_GPT = 111
export const GPT_ID__RAMMUS_GPT = 222
export const GPT_ID__CHROME_GPT = 333
export const GPT_ID__CHATGPT_4O = 444
export const GPT_ID__CHATGPT_4O_MINI = 555

export const DEV_GPT_IDS = [GPT_ID__LOREM_IPSUM_GPT, GPT_ID__RAMMUS_GPT]

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
