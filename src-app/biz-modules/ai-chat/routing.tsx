/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react'
import { Route } from 'react-router-dom'

const AgentsPage = lazy(() => import('@app/biz-modules/ai-chat/pages/settings/agents-page'))
const ChatsPage = lazy(() => import('@app/biz-modules/ai-chat/pages/settings/chats-page'))
const MainPage = lazy(() => import('./pages/main/main-page'))

export const aiChatRoutes = (
	<>
		<Route path="/" element={<MainPage />} />
		<Route path="/chat/:chatId?" element={<MainPage />} />
		<Route path="/settings/agents" element={<AgentsPage />} />
		<Route path="/settings/chats" element={<ChatsPage />} />
	</>
)
