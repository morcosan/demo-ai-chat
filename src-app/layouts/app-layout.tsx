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

export const AppLayout = ({ pageClassName = '', children }: Props) => {
	const [hasMenu, setHasMenu] = useState(false)
	const [hasSettings, setHasSettings] = useState(false)
	const { isViewportMaxLG } = useUiViewport()
	const location = useLocation()

	const onToggleNavMenu = () => setHasMenu(!hasMenu)
	const onToggleSettings = () => setHasSettings(!hasSettings)

	useEffect(() => {
		setHasMenu(false)
	}, [isViewportMaxLG])

	useEffect(() => {
		setHasMenu(false)
	}, [location.pathname])

	return (
		<div
			className={`flex ${isViewportMaxLG ? 'flex-col' : ''} h-screen w-screen`}
			style={{ paddingTop: isViewportMaxLG ? 'var(--app-spacing-navbar-h)' : 0 }}
		>
			{isViewportMaxLG ? <MobileNavbar onToggleNavMenu={onToggleNavMenu} /> : <DesktopNavbar />}

			<div
				className={[
					'absolute bottom-0 left-0 z-popup w-full',
					'border-t border-color-border-shadow shadow-lg',
					'transition-transform duration-300 ease-out',
					hasMenu ? 'translate-x-0' : '-translate-x-full',
				].join(' ')}
				style={{ top: 'var(--app-spacing-navbar-h)', background: 'var(--app-color-bg-navbar)' }}
			>
				{hasSettings ? (
					<SettingsMenu onClickBack={onToggleSettings} />
				) : (
					<MobileNavMenu onToggleSettings={onToggleSettings} />
				)}
			</div>

			<div className={`h-full w-full flex-1 ${pageClassName}`}>{children}</div>
		</div>
	)
}
