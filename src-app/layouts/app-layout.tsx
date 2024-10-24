import { AiChatSearchModal } from '@app/biz-modules/ai-chat/nav/search-modal'
import { AiChatView, useAiChatLayout } from '@app/biz-modules/ai-chat/state'
import { I18nModal } from '@app/core-modules/i18n-modal'
import { SettingsMenu } from '@app/layouts/navbar/_settings-menu'
import { useUiViewport } from '@ds/release'
import { useEffect, useState } from 'react'
import { DesktopNavbar } from './navbar/desktop-navbar'
import { MobileNavMenu } from './navbar/mobile-nav-menu'
import { MobileNavbar } from './navbar/mobile-navbar'

interface Props extends ReactProps {
	blank?: boolean
}

export const AppLayout = ({ blank, children }: Props) => {
	const { isViewportMaxLG } = useUiViewport()
	const { activeView, setActiveView } = useAiChatLayout()
	const [showsI18nModal, setShowsI18nModal] = useState(false)
	const [showsNavMenu, setShowsNavMenu] = useState(false)
	const [showsSettingsMenu, setShowsSettingsMenu] = useState(false)

	const contentClass = cx({
		'flex flex-col px-xs-8 pb-sm-5 pt-xs-7 md:px-sm-5 lg:mx-auto lg:max-w-xxl-2 lg:pb-sm-9 lg:pt-sm-3': blank,
		'flex h-full w-full': !blank,
	})

	const onToggleNavMenu = () => {
		setShowsNavMenu(!showsNavMenu)

		if (activeView === AiChatView.MOBILE_SUBCHAT) {
			setActiveView(AiChatView.MOBILE_CHAT)
		}
	}
	const onToggleSettings = () => setShowsSettingsMenu(!showsSettingsMenu)

	useEffect(() => {
		setShowsNavMenu(false)
	}, [isViewportMaxLG])

	useEffect(() => {
		activeView === AiChatView.MOBILE_SUBCHAT && setShowsNavMenu(false)
	}, [activeView])

	return (
		<div
			className={cx('flex h-full w-full', isViewportMaxLG && 'flex-col')}
			style={{ paddingTop: isViewportMaxLG ? 'var(--app-spacing-navbar-h)' : 0 }}
		>
			{isViewportMaxLG ? (
				<MobileNavbar hasMenu={showsNavMenu} onToggleNavMenu={onToggleNavMenu} />
			) : (
				<DesktopNavbar unselected={blank} onClickLanguage={() => setShowsI18nModal(true)} />
			)}

			{/* MENU OVERLAY */}
			<div
				className={cx('absolute-overlay z-modal backdrop-blur-subtle', !showsNavMenu && 'hidden')}
				style={{ top: 'var(--app-spacing-navbar-h)' }}
				onClick={() => setShowsNavMenu(false)}
			/>
			{/* MENU CONTENT */}
			<div
				className={cx(
					'fixed bottom-0 left-0 right-0 z-modal mr-button-h-md',
					'border-r border-t border-color-border-shadow shadow-lg',
					'transition-transform duration-300 ease-out',
					showsNavMenu ? 'translate-x-0' : '-translate-x-full'
				)}
				style={{ top: 'var(--app-spacing-navbar-h)', background: 'var(--app-color-bg-navbar)' }}
			>
				{showsSettingsMenu ? (
					<SettingsMenu onClickBack={onToggleSettings} onClickLanguage={() => setShowsI18nModal(true)} />
				) : (
					<MobileNavMenu
						unselected={blank}
						onHideNavMenu={() => setShowsNavMenu(false)}
						onToggleSettings={onToggleSettings}
					/>
				)}
			</div>

			{/* PAGE CONTENT */}
			<div className="h-full w-full flex-1 overflow-x-hidden">
				<div className={contentClass}>{children}</div>
			</div>

			{/* MODALS */}
			<I18nModal opened={showsI18nModal} onClose={() => setShowsI18nModal(false)} />
			<AiChatSearchModal />
		</div>
	)
}
