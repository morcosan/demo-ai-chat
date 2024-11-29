import { GptAPI } from '@api/types'
import { randomFromArray, randomTrue } from '@utils/release'

const MAIN_RESPONSE = 'OK.'
const OTHER_RESPONSES: string[] = ['Right.', 'Alright.', 'Yeah.', 'Yeh.', 'Yep.', 'Mhm.']

export const RammusGPT: GptAPI = {
	isAvailable: async () => true,

	async getResponse(): Promise<string> {
		return randomTrue() ? MAIN_RESPONSE : randomFromArray(OTHER_RESPONSES)
	},
}
