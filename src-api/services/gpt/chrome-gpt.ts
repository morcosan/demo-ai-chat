import { SYSTEM_PROMPTS } from '@api/services/gpt/_prompts'
import { CreativityLevel, GPT_RESP__UNAVAILABLE, GptAPI, GptConfig, GptMessage, GptResponse } from '@api/types'

const HISTORY_LIMIT = 20
const CREATIVITY_MAP: Record<CreativityLevel, number> = {
	min: 0,
	low: 0.5,
	mid: 1,
	high: 1.5,
	max: 2,
}

export const ChromeGPT: GptAPI = {
	async isAvailable() {
		return Boolean(
			window.ai?.languageModel && (await window.ai.languageModel.capabilities()).available === 'readily'
		)
	},

	async getResponse(config: GptConfig, messages: GptMessage[]): Promise<GptResponse> {
		if (!window.ai || !ChromeGPT.isAvailable()) return GPT_RESP__UNAVAILABLE

		const prompt = messages.slice(-HISTORY_LIMIT).reduce((acc: string, message: GptMessage) => {
			return `${acc} \n\n <<${message.role}>> \n ${message.text} \n\n <<agent>> \n`
		}, '')

		const systemPrompt = SYSTEM_PROMPTS.reduce((acc, text) => acc + text + '\n', '') + config.prompt

		// https://docs.google.com/document/d/1VG8HIyz361zGduWgNG7R_R8Xkv0OOJ8b5C9QKeCjU0c
		const session = await window.ai.languageModel.create({
			systemPrompt,
			temperature: CREATIVITY_MAP[config.creativity],
			topK: 3,
		})
		const resp = await session.prompt(prompt)
		const text = resp.replace(/<<agent>>/gi, '')

		return { text }
	},
}
