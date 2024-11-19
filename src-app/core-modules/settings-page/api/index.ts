import { mainAPI, Status } from '@app/api'

export const API = {
	async resetDatabase(): Promise<boolean> {
		const resp = await mainAPI.delete('/api/database', {})

		return resp.status === Status.SUCCESS
	},
}
