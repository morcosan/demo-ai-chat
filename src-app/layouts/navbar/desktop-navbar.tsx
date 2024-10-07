import { AiChatTab, useAiChat } from '@app/biz-modules/ai-chat/state'
import { useEffect } from 'react'
import { AppLogo } from './_app-logo'
import { NavMenu } from './nav-menu'

export const DesktopNavbar = () => {
	const { setActiveTab } = useAiChat()

	useEffect(() => {
		setActiveTab(AiChatTab.ALL)
	}, [])

	return (
		<nav className="z-navbar h-full min-w-lg-7 max-w-lg-7 bg-color-bg-navbar shadow-lg">
			<NavMenu slotTop={<AppLogo className="mb-xs-9" />} />
		</nav>
	)
}
