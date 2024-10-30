import { mainAPI, STATUS__SUCCESS } from '@app/api'

export const API = {
	async resetDatabase(): Promise<boolean> {
		const resp = await mainAPI.delete('/api/database', {})

		return resp.status === STATUS__SUCCESS
	},
}
