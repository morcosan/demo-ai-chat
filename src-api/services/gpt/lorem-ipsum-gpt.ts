import { CreativityLevel, GptAPI, GptConfig, GptMessage, GptResponse } from '@api/types'
import { randomMarkdown, resetRandomSeed, setRandomSeed } from '@utils/release'

const CREATIVITY_MAP: Record<CreativityLevel, [number, number]> = {
	min: [500_000, 2], // 8 min
	low: [200_000, 4], // 3 min
	mid: [100_000, 6], // 1 min
	high: [10_000, 8], // 10 sec
	max: [1_000, 10], // 1 sec
}

export const LoremIpsumGPT: GptAPI = {
	async isAvailable() {
		return true
	},

	async getResponse(config: GptConfig, messages: GptMessage[]): Promise<GptResponse> {
		const message = messages[messages.length - 1]
		const extra = message?.text.length || 0
		const seed = extra + Math.floor(new Date().getTime() / CREATIVITY_MAP[config.creativity][0])

		setRandomSeed(seed)
		const text = randomMarkdown(CREATIVITY_MAP[config.creativity][1])
		resetRandomSeed()

		return { text }
	},
}
