import { apiDocsRoutes } from '@api/docs/routing'
import { aiChatRoutes } from '@app/biz-modules/ai-chat/routing'
import { settingsRoutes } from '@app/biz-modules/user-settings/routing'
import { lazy } from 'react'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'

const LogoutPage = lazy(() => import('@app/core-modules/logout-page/page'))
const NotFoundPage = lazy(() => import('@app/core-modules/404-page/page'))

const Root = () => {
	return (
		<Routes>
			{aiChatRoutes}
			{settingsRoutes}
			{apiDocsRoutes}
			<Route path="/logout" element={<LogoutPage />} />
			<Route path="/*" element={<NotFoundPage />} />
		</Routes>
	)
}

const router = createBrowserRouter([{ path: '*', element: <Root /> }], { basename: ENV__ROOT_URL_PATH })

export const Router = () => {
	return <RouterProvider router={router} />
}
