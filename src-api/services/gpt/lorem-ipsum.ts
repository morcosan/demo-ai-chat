import { GptAPI } from '@api/types'
import { randomInt, randomLongText } from '@utils/release'

export const LoremIpsum: GptAPI = {
	async getResponse(): Promise<string> {
		return randomLongText(randomInt(1, 40))
	},
}
