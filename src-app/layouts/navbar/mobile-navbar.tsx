import { AiChatTab, useAiChat } from '@app/biz-modules/ai-chat/state'
import { IconButton, MenuSvg } from '@ds/release'
import { useEffect } from 'react'
import { AppLogo } from './_app-logo'

interface Props {
	onToggleNavMenu(): void
}

export const MobileNavbar = ({ onToggleNavMenu }: Props) => {
	const { setActiveTab } = useAiChat()

	useEffect(() => {
		setActiveTab(AiChatTab.CHAT)
	}, [])

	return (
		<nav
			className="fixed left-0 top-0 z-navbar w-full border-t border-color-border-shadow shadow-md"
			style={{ minHeight: 'var(--app-spacing-navbar-h)', height: 'var(--app-spacing-navbar-h)' }}
		>
			<div className="flex h-full items-center bg-color-bg-navbar px-xs-2">
				<IconButton tooltip="Open menu" onClick={onToggleNavMenu}>
					<MenuSvg className="h-xs-9" />
				</IconButton>

				<AppLogo className="ml-xs-3" small />
			</div>
		</nav>
	)
}
