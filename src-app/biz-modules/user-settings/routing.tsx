/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react'
import { Route } from 'react-router-dom'

const Page = lazy(() => import('./pages/page'))

export const settingsRoutes = <Route path="/settings" element={<Page />} />
