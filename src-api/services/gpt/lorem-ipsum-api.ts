import { GptAPI } from '@api/types'
import { randomInt, randomLongText } from '@utils/release'

export const LoremIpsumAPI: GptAPI = {
	isAvailable: () => true,

	async getResponse(): Promise<string> {
		return randomLongText(randomInt(1, 40))
	},
}
