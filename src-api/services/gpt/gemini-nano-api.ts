import { CreativityLevel, GptAPI, GptConfig } from '@api/types'

// Google docs:
// https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c

const TEMPERATURE_MAP: Record<CreativityLevel, number> = {
	min: 0,
	low: 0.5,
	mid: 1,
	high: 1.5,
	max: 2,
}

export const GeminiNanoAPI: GptAPI = {
	isAvailable: () => Boolean(window.ai?.languageModel),

	async getResponse(config: GptConfig, messages: string[]): Promise<string> {
		if (!window.ai) return ''

		const session = await window.ai.languageModel.create({
			systemPrompt: config.prompt,
			temperature: TEMPERATURE_MAP[config.creativity],
			topK: 3,
		})

		return session.prompt(messages[0])
	},
}
