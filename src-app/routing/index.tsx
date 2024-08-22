import { lazy } from 'react'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'

const AiChat = lazy(() => import('../biz-modules/ai-chat'))
const ApiDocs = lazy(() => import('@api/docs/api-docs'))

const Root = () => {
	return (
		<Routes>
			<Route path="/api/*" element={<ApiDocs />} />
			<Route path="/*" element={<AiChat />} />
		</Routes>
	)
}

const router = createBrowserRouter([{ path: '*', element: <Root /> }], { basename: ENV__ROOT_URL_PATH })

export const Router = () => {
	return <RouterProvider router={router} />
}
