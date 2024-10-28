/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react'
import { Route } from 'react-router-dom'

const Page = lazy(() => import('./_page'))

export const apiDocsRoutes = <Route path="/docs/api/*" element={<Page />} />
