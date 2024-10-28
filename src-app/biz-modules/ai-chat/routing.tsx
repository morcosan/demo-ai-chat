/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react'
import { Route } from 'react-router-dom'

const MainPage = lazy(() => import('./pages/main/main-page'))
const ConfigPage = lazy(() => import('./pages/config/config-page'))

export const aiChatRoutes = (
	<>
		<Route path="/" element={<MainPage />} />
		<Route path="/chat/:chatId?" element={<MainPage />} />
		<Route path="/chats-config" element={<ConfigPage />} />
	</>
)
