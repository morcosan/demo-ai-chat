import { useContext } from 'react'
import { Context, EMPTY_ACCOUNT, EMPTY_BILLING } from './_context'
import { UserAccountProvider } from './_provider'

export const useUserAccount = () => useContext(Context)
export { EMPTY_ACCOUNT, EMPTY_BILLING, UserAccountProvider }
