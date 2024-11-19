import { AccountApiPayload, AccountDTO, BillingApiPayload, BillingDTO, mainAPI, Status } from '@app/api'
import { mapAccount, mapBilling } from './_mappers'
import { Account, Billing } from './_types'

export * from './_types'

export const API = {
	async getAccount(): Promise<Account | null> {
		const resp = await mainAPI.get<AccountDTO>('/api/account', {})

		return resp.status === Status.SUCCESS && resp.data ? mapAccount(resp.data) : null
	},

	async getBilling(): Promise<Billing | null> {
		const resp = await mainAPI.get<BillingDTO>('/api/billing', {})

		return resp.status === Status.SUCCESS && resp.data ? mapBilling(resp.data) : null
	},

	async updateAccount(account: Account): Promise<Account | null> {
		const payload: AccountApiPayload = { ...account }
		const resp = await mainAPI.patch<AccountDTO>('/api/account', payload)

		return resp.status === Status.SUCCESS && resp.data ? mapAccount(resp.data) : null
	},

	async updateBilling(billing: Billing): Promise<Billing | null> {
		const payload: BillingApiPayload = { ...billing }
		const resp = await mainAPI.patch<BillingDTO>('/api/billing', payload)

		return resp.status === Status.SUCCESS && resp.data ? mapBilling(resp.data) : null
	},
}
