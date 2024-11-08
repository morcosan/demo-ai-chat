import { useEffect, useMemo, useState } from 'react'
import { Account, API, Billing } from '../api'
import { Context, EMPTY_ACCOUNT, EMPTY_BILLING, Store } from './_context'

export const UserAccountProvider = ({ children }: ReactProps) => {
	const [account, setAccount] = useState<Account>(EMPTY_ACCOUNT)
	const [billing, setBilling] = useState<Billing>(EMPTY_BILLING)
	const [accountLoading, setAccountLoading] = useState<ListLoading>('full')
	const [billingLoading, setBillingLoading] = useState<ListLoading>('full')

	const fetchAccount = async () => {
		const account = await API.getAccount()
		if (account) {
			setAccount(account)
			setAccountLoading(false)
		}
	}

	const fetchBilling = async () => {
		const billing = await API.getBilling()
		if (billing) {
			setBilling(billing)
			setBillingLoading(false)
		}
	}

	const updateAccount = async (data: Account): Promise<boolean> => {
		setAccountLoading('update')

		const account = await API.updateAccount(data)
		if (account) {
			setAccount(account)
			setAccountLoading(false)
			return true
		}
		return false
	}

	const updateBilling = async (data: Billing): Promise<boolean> => {
		setBillingLoading('update')

		const billing = await API.updateBilling(data)
		if (billing) {
			setBilling(billing)
			setBillingLoading(false)
			return true
		}
		return false
	}

	useEffect(() => {
		fetchAccount()
		fetchBilling()
	}, [])

	const store: Store = useMemo(
		() => ({
			account,
			accountLoading,
			billing,
			billingLoading,
			updateAccount,
			updateBilling,
		}),
		[account, accountLoading, billing, billingLoading]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
