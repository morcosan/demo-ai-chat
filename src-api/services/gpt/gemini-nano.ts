import { GptAPI, GptConfig, GptUnit } from '@api/types'

// Google docs: https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c

export const GeminiNano: GptAPI = {
	isAvailable: Boolean(window.ai?.languageModel),

	async createUnit(config: GptConfig): Promise<GptUnit> {
		if (!window.ai) throw new Error('window.ai is undefined')

		const session = await window.ai.languageModel.create({
			systemPrompt: config.setup,
			temperature: 1,
			topK: 3,
		})

		return {
			async getResponse(messages: string[]): Promise<string> {
				return session.prompt(messages[0])
			},
		}
	},
}
