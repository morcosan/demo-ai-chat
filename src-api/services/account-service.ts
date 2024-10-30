import { AccountApiPayload, AccountDTO, ApiResponse, STATUS__SUCCESS } from '@api/types'
import { getDbAccount, setDbAccount } from './db'

export const accountService = {
	async getAccount(): Promise<ApiResponse<AccountDTO>> {
		return { status: STATUS__SUCCESS, data: getDbAccount() }
	},

	async patchAccount(payload: AccountApiPayload): Promise<ApiResponse<AccountDTO>> {
		const dbAccount = getDbAccount()

		setDbAccount({
			name: payload.name?.trim() || dbAccount.name,
			avatar: payload.avatar?.trim() || dbAccount.avatar,
			email: payload.email?.trim() || dbAccount.email,
			phone: payload.phone?.trim() || '',
		})

		return { status: STATUS__SUCCESS, data: getDbAccount() }
	},
}
