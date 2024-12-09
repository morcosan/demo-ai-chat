import { DatabaseApiQuery, mainAPI, Status } from '@app/api'

export const API = {
	async resetDatabase(random: boolean): Promise<boolean> {
		const query: DatabaseApiQuery = { random }
		const resp = await mainAPI.delete('/api/database', query)

		return resp.status === Status.SUCCESS
	},
}
