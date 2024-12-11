import { AccountApiPayload, AccountDTO, ApiResponse, Status } from '@api/types'
import { getDbAccount, resetDbAccount, setDbAccount } from './db'

export const accountService = {
	async getAccount(): Promise<ApiResponse<AccountDTO>> {
		return { status: Status.SUCCESS, data: getDbAccount() }
	},

	async patchAccount(payload: AccountApiPayload): Promise<ApiResponse<AccountDTO>> {
		const dbAccount = getDbAccount()

		setDbAccount({
			name: payload.name?.trim() || dbAccount.name,
			avatar: payload.avatar?.trim() || dbAccount.avatar,
			email: payload.email?.trim() || dbAccount.email,
			phone: payload.phone?.trim() || '',
			openaiApiKey: payload.openaiApiKey?.trim() || '',
			anthropicApiKey: payload.anthropicApiKey?.trim() || '',
		})

		return { status: Status.SUCCESS, data: getDbAccount() }
	},

	async resetDB(random: boolean) {
		resetDbAccount(random)
	},
}
