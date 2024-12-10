import { CreativityLevel, GptAPI, GptConfig, GptMessage } from '@api/types'

const TEMPERATURE_MAP: Record<CreativityLevel, number> = {
	min: 0,
	low: 0.5,
	mid: 1,
	high: 1.5,
	max: 2,
}
const HISTORY_LIMIT = 20

export const ChromeGPT: GptAPI = {
	isAvailable: async () => {
		return Boolean(
			window.ai?.languageModel && (await window.ai.languageModel.capabilities()).available === 'readily'
		)
	},

	async getResponse(config: GptConfig, messages: GptMessage[]): Promise<string> {
		if (!window.ai) return ''

		try {
			const prompt = messages.slice(-HISTORY_LIMIT).reduce((acc: string, message: GptMessage) => {
				return `${acc} \n\n <<${message.role}>> \n ${message.text} \n\n <<agent>> \n`
			}, '')

			// https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c
			const session = await window.ai.languageModel.create({
				systemPrompt: config.prompt,
				temperature: TEMPERATURE_MAP[config.creativity],
				topK: 3,
			})
			const resp = await session.prompt(prompt)

			return resp.replace(/<<agent>>/gi, '')
			//
		} catch (error) {
			ERROR(error)
			return ''
		}
	},
}
