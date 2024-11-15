import { GptAPI, GptUnit } from '@api/types'
import { randomInt, randomLongText } from '@utils/release'

export const LoremIpsum: GptAPI = {
	isAvailable: true,

	async createUnit(): Promise<GptUnit> {
		return {
			async getResponse(): Promise<string> {
				return randomLongText(randomInt(1, 40))
			},
		}
	},
}
