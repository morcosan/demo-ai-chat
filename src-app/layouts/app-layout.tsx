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

	const contentClass = cx(
		'relative',
		blank && 'flex flex-col px-xs-8 pb-sm-5 pt-xs-7 md:px-sm-5 lg:mx-auto lg:max-w-xxl-2 lg:pb-sm-9 lg:pt-sm-3',
		!blank && 'flex h-full w-full'
	)

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
				<>
					{/* NAVBAR */}
					<MobileNavbar hasMenu={showsNavMenu} onToggleNavMenu={onToggleNavMenu} />

					{/* MENU OVERLAY */}
					<div
						className={cx('absolute-overlay backdrop-blur-subtle', !showsNavMenu && 'hidden')}
						style={{ top: 'var(--app-spacing-navbar-h)', zIndex: 'calc(var(--ds-z-index-navbar) - 1)' }}
						onClick={() => setShowsNavMenu(false)}
					/>
					{/* MENU CONTENT */}
					<nav
						aria-label={t('core.label.navigationMenu')}
						className={cx(
							'fixed bottom-0 left-0 right-0 mr-button-h-md',
							'border-r border-t border-color-border-shadow bg-color-bg-card shadow-lg',
							'transition-transform duration-300 ease-out',
							showsNavMenu ? 'translate-x-0' : '-translate-x-full'
						)}
						style={{ top: 'var(--app-spacing-navbar-h)', zIndex: 'calc(var(--ds-z-index-navbar) - 1)' }}
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
					</nav>
				</>
			) : (
				<DesktopNavbar unselected={blank} onClickLanguage={() => setShowsI18nModal(true)} />
			)}

			{/* PAGE CONTENT */}
			<main className="h-full w-full flex-1 overflow-x-hidden">
				<div className={contentClass}>{children}</div>

				{/* MODALS */}
				<I18nModal opened={showsI18nModal} onClose={() => setShowsI18nModal(false)} />
				<AiChatSearchModal />
			</main>
		</div>
	)
}
