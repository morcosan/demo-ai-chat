import { CreativityLevel, GptAPI, GptConfig, GptResponse } from '@api/types'
import { randomFromArray, randomInt } from '@utils/release'

const MAIN_RESPONSE = 'OK.'
const ALL_RESPONSES: string[] = [MAIN_RESPONSE, 'Right.', 'Alright.', 'Yeah.', 'Yeh.', 'Yep.', 'Mhm.']
const CREATIVITY_MAP: Record<CreativityLevel, number> = {
	min: 0,
	low: 1,
	mid: 2,
	high: 3,
	max: 4,
}

export const RammusGPT: GptAPI = {
	async isAvailable() {
		return true
	},

	async getResponse(config: GptConfig): Promise<GptResponse> {
		const randomness = randomInt(0, 4)
		const temperature = CREATIVITY_MAP[config.creativity]
		const response = randomFromArray(ALL_RESPONSES)

		return { text: randomness <= temperature ? response : MAIN_RESPONSE }
	},
}
