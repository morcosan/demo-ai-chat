import { CreativityLevel } from './_db'

export const GPT_ID__LOREM_IPSUM = 111
export const GPT_ID__RAMMUS = 222
export const GPT_ID__GEMINI_NANO = 333

export const UI_TAG__GPT_DESCRIPTION = '{gpt_description}'

export interface GptAPI {
	isAvailable(): boolean
	createUnit(config: GptConfig): Promise<GptUnit | null>
}

export interface GptConfig {
	creativity: CreativityLevel
	prompt: string
}

export interface GptUnit {
	getResponse(messages: string[]): Promise<string>
}
