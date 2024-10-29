import { useContext } from 'react'
import { ACCOUNT_EMPTY, BILLING_EMPTY, Context } from './_context'
import { UserAccountProvider } from './_provider'

export const useUserAccount = () => useContext(Context)
export { ACCOUNT_EMPTY, BILLING_EMPTY, UserAccountProvider }
