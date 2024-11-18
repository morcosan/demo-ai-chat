import { GptAPI, GptConfig, GptUnit } from '@api/types'

// Google docs: https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c

export const GeminiNanoAPI: GptAPI = {
	// isAvailable: () => Boolean(window.ai?.languageModel),
	isAvailable: () => false,

	async createUnit(config: GptConfig): Promise<GptUnit | null> {
		if (!window.ai) return null

		const session = await window.ai.languageModel.create({
			systemPrompt: config.prompt,
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
