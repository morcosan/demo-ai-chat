import { GptAPI, GptUnit } from '@api/types'
import { randomInt, randomLongText } from '@utils/release'

export const LoremIpsumAPI: GptAPI = {
	isAvailable: () => true,

	async createUnit(): Promise<GptUnit | null> {
		return {
			async getResponse(): Promise<string> {
				return randomLongText(randomInt(1, 40))
			},
		}
	},
}
