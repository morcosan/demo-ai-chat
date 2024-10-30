import { apiDocsRoutes } from '@api/docs/routing'
import { aiChatRoutes } from '@app/biz-modules/ai-chat/routing'
import { userSettingsRoutes } from '@app/biz-modules/user-settings/routing'
import { lazy } from 'react'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'

const LogoutPage = lazy(() => import('@app/core-modules/logout-page'))
const NotFoundPage = lazy(() => import('@app/core-modules/404-page'))
const SettingsPage = lazy(() => import('@app/core-modules/settings-page'))

const Root = () => {
	return (
		<Routes>
			{aiChatRoutes}
			{apiDocsRoutes}
			{userSettingsRoutes}
			<Route path="/logout" element={<LogoutPage />} />
			<Route path="/settings" element={<SettingsPage />} />
			<Route path="/*" element={<NotFoundPage />} />
		</Routes>
	)
}

const router = createBrowserRouter([{ path: '*', element: <Root /> }], { basename: ENV__ROOT_URL_PATH })

export const Router = () => {
	return <RouterProvider router={router} />
}
