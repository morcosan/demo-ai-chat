import { lazy } from 'react'
import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'

const AiChat = lazy(() => import('../biz-modules/ai-chat'))
const ApiDocs = lazy(() => import('../../src-api/docs/api-docs'))

const Root = () => {
	return (
		<Routes>
			<Route path="/*" element={<AiChat />} />
			<Route path="/api/*" element={<ApiDocs />} />
		</Routes>
	)
}

const router = createBrowserRouter([{ path: '*', element: <Root /> }])

export const Router = () => {
	return <RouterProvider router={router} />
}
