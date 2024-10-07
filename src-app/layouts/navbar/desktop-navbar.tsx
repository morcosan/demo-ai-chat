import { AiChatTab, useAiChat } from '@app/biz-modules/ai-chat/state'
import { AiChatNavMenu } from '@app/biz-modules/ai-chat/views/nav/nav-menu'
import { useEffect, useRef, useState } from 'react'
import { AppLogo } from './_app-logo'
import { SettingsButton } from './_settings-button'
import { SettingsMenu } from './_settings-menu'

export const DesktopNavbar = () => {
	const { setActiveTab } = useAiChat()
	const [openedSettings, setOpenedSettings] = useState(false)

	const settingsRef = useRef<HTMLDivElement>(null)

	const menuClass = [
		openedSettings ? 'block' : 'hidden',
		'absolute bottom-0 right-0 translate-x-full z-popup shadow-lg',
		'w-lg-6 bg-color-bg-default border border-color-border-shadow rounded-md',
	].join(' ')

	const onClickWindow = (event: MouseEvent) => {
		const target = event.target as HTMLElement
		const wrapper = settingsRef.current

		if (wrapper && !wrapper.contains(target)) {
			setOpenedSettings(false)
		}
	}

	useEffect(() => {
		window.addEventListener('mousedown', onClickWindow)

		return () => {
			window.removeEventListener('mousedown', onClickWindow)
		}
	}, [])

	useEffect(() => {
		setActiveTab(AiChatTab.BOTH)
	}, [])

	return (
		<nav className="z-navbar h-full min-w-lg-7 max-w-lg-7 shadow-lg">
			<div
				className="flex h-full w-full flex-col px-a11y-scrollbar py-scrollbar-w"
				style={{ background: 'var(--app-color-bg-navbar)' }}
			>
				{/* LOGO */}
				<AppLogo className="mb-xs-9" />

				{/* AI CHAT */}
				<AiChatNavMenu />

				{/* SETTINGS */}
				<div ref={settingsRef} className="relative">
					<SettingsButton
						highlight={openedSettings ? 'pressed' : 'default'}
						onClick={() => setOpenedSettings(!openedSettings)}
					/>
					<div className={menuClass}>
						<SettingsMenu />
					</div>
				</div>
			</div>
		</nav>
	)
}
