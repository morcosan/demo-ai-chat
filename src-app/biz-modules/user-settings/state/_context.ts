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

export const EMPTY_ACCOUNT: Account = {
	name: '',
	email: '',
	phone: '',
	avatar: '',
}
export const EMPTY_BILLING: Billing = {
	name: '',
	address: '',
	city: '',
	country: '',
	postalCode: '',
	vatNumber: '',
}

export const Context = createContext<Store>({
	account: EMPTY_ACCOUNT,
	accountLoading: 'full',
	billing: EMPTY_BILLING,
	billingLoading: 'full',
	updateAccount: async () => false,
	updateBilling: async () => false,
})
