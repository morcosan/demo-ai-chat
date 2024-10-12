import { AiChatView, useAiChat } from '@app/biz-modules/ai-chat/state'
import { I18nModal } from '@app/i18n/modal'
import { SettingsMenu } from '@app/layouts/navbar/_settings-menu'
import { useUiViewport } from '@ds/release'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DesktopNavbar } from './navbar/desktop-navbar'
import { MobileNavMenu } from './navbar/mobile-nav-menu'
import { MobileNavbar } from './navbar/mobile-navbar'

interface Props extends ReactProps {
	pageClassName?: string
}

export const AppLayout = ({ pageClassName, children }: Props) => {
	const { isViewportMaxLG } = useUiViewport()
	const { activeView, setActiveView } = useAiChat()
	const [hasMenu, setHasMenu] = useState(false)
	const [hasSettings, setHasSettings] = useState(false)
	const [hasLanguage, setHasLanguage] = useState(false)
	const location = useLocation()

	const onToggleNavMenu = () => {
		setHasMenu(!hasMenu)

		if (activeView === AiChatView.MOBILE_SUBCHAT) {
			setActiveView(AiChatView.MOBILE_CHAT)
		}
	}
	const onToggleSettings = () => setHasSettings(!hasSettings)

	useEffect(() => {
		setHasMenu(false)
	}, [isViewportMaxLG])

	useEffect(() => {
		setHasMenu(false)
	}, [location.pathname])

	useEffect(() => {
		activeView === AiChatView.MOBILE_SUBCHAT && setHasMenu(false)
	}, [activeView])

	return (
		<div
			className={cx('flex h-full w-full', isViewportMaxLG && 'flex-col')}
			style={{ paddingTop: isViewportMaxLG ? 'var(--app-spacing-navbar-h)' : 0 }}
		>
			{isViewportMaxLG ? (
				<MobileNavbar hasMenu={hasMenu} onToggleNavMenu={onToggleNavMenu} />
			) : (
				<DesktopNavbar onClickLanguage={() => setHasLanguage(true)} />
			)}

			{/* MENU OVERLAY */}
			<div
				className={cx('absolute-overlay z-modal backdrop-blur-sm', !hasMenu && 'hidden')}
				style={{ top: 'var(--app-spacing-navbar-h)' }}
				onClick={() => setHasMenu(false)}
			/>
			{/* MENU CONTENT */}
			<div
				className={cx(
					'fixed bottom-0 left-0 right-0 z-modal mr-button-h-md',
					'border-r border-t border-color-border-shadow shadow-lg',
					'transition-transform duration-300 ease-out',
					hasMenu ? 'translate-x-0' : '-translate-x-full'
				)}
				style={{ top: 'var(--app-spacing-navbar-h)', background: 'var(--app-color-bg-navbar)' }}
			>
				{hasSettings ? (
					<SettingsMenu onClickBack={onToggleSettings} onClickLanguage={() => setHasLanguage(true)} />
				) : (
					<MobileNavMenu onToggleSettings={onToggleSettings} />
				)}
			</div>

			{/* PAGE CONTENT */}
			<div className={cx('h-full w-full flex-1', pageClassName)}>{children}</div>

			{/* MODALS */}
			<I18nModal opened={hasLanguage} onClose={() => setHasLanguage(false)} />
		</div>
	)
}
