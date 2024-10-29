/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react'
import { Route } from 'react-router-dom'

const AccountPage = lazy(() => import('./pages/account-page'))
const BillingPage = lazy(() => import('./pages/billing-page'))

export const userAccountRoutes = (
	<>
		<Route path="/settings/account" element={<AccountPage />} />
		<Route path="/settings/billing" element={<BillingPage />} />
	</>
)
