import { createContext } from 'react'
import { Account, Billing } from '../api'

export interface Store {
	account: Account
	accountLoading: ListLoading
	billing: Billing
	billingLoading: ListLoading
	updateAccount(data: Account): Promise<boolean>
	updateBilling(data: Billing): Promise<boolean>
}

export const ACCOUNT_EMPTY: Account = {
	name: '',
	email: '',
	phone: '',
	avatar: '',
}
export const BILLING_EMPTY: Billing = {
	name: '',
	address: '',
	city: '',
	country: '',
	postalCode: '',
	vatNumber: '',
}

export const Context = createContext<Store>({
	account: ACCOUNT_EMPTY,
	accountLoading: 'full',
	billing: BILLING_EMPTY,
	billingLoading: 'full',
	updateAccount: async () => false,
	updateBilling: async () => false,
})
