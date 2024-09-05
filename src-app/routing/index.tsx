import { lazy } from 'react'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'

const AiChatPage = lazy(() => import('@app/biz-modules/ai-chat/page'))
const ApiDocsPage = lazy(() => import('@api/docs/page'))
const LogoutPage = lazy(() => import('@app/core-modules/logout-page/page'))
const NotFoundPage = lazy(() => import('@app/core-modules/404-page/page'))
const SettingsPage = lazy(() => import('@app/biz-modules/user-settings/page.tsx'))

const Root = () => {
	return (
		<Routes>
			<Route path="/" element={<AiChatPage />} />
			<Route path="/chat/:chatId" element={<AiChatPage />} />
			<Route path="/docs/api/*" element={<ApiDocsPage />} />
			<Route path="/settings" element={<SettingsPage />} />
			<Route path="/logout" element={<LogoutPage />} />
			<Route path="/*" element={<NotFoundPage />} />
		</Routes>
	)
}

const router = createBrowserRouter([{ path: '*', element: <Root /> }], { basename: ENV__ROOT_URL_PATH })

export const Router = () => {
	return <RouterProvider router={router} />
}
