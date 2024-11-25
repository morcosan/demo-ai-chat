import { GptAPI } from '@api/types'
import { randomMarkdown } from '@utils/release'

export const LoremIpsumAPI: GptAPI = {
	isAvailable: async () => true,

	async getResponse(): Promise<string> {
		return randomMarkdown()
	},
}
