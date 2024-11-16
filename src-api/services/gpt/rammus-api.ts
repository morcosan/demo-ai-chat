import { GptAPI, GptUnit } from '@api/types'
import { randomFromArray, randomTrue } from '@utils/release'

const MAIN_RESPONSE = 'OK.'
const OTHER_RESPONSES: string[] = ['Right.', 'Alright.', 'Yeah.', 'Yeh.', 'Yep.', 'Mhm.']

export const RammusAPI: GptAPI = {
	isAvailable: () => true,

	async createUnit(): Promise<GptUnit | null> {
		return {
			async getResponse(): Promise<string> {
				return randomTrue() ? MAIN_RESPONSE : randomFromArray(OTHER_RESPONSES)
			},
		}
	},
}
