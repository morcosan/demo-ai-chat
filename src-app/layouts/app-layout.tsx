import { SettingsMenu } from '@app/layouts/navbar/_settings-menu'
import { useUiViewport } from '@ds/release'
import { useEffect, useState } from 'react'
import { NavTab } from './navbar/_types'
import { DesktopNavbar } from './navbar/desktop-navbar'
import { MobileNavMenu } from './navbar/mobile-nav-menu'
import { MobileNavbar } from './navbar/mobile-navbar'

interface Props extends ReactProps {
	pageClassName?: string
}

export const AppLayout = ({ pageClassName = '', children }: Props) => {
	const [navTab, setNavTab] = useState<NavTab>(NavTab.MODULE)
	const { isViewportMaxMD } = useUiViewport()

	const onToggleNavMenu = () => setNavTab(navTab !== NavTab.MODULE ? NavTab.MODULE : NavTab.MENU)
	const onToggleSettings = () => setNavTab(navTab === NavTab.SETTINGS ? NavTab.MENU : NavTab.SETTINGS)

	useEffect(() => {
		setNavTab(NavTab.MODULE)
	}, [isViewportMaxMD])

	return (
		<div
			className={`flex ${isViewportMaxMD ? 'flex-col' : ''} h-screen w-screen`}
			style={{ paddingTop: isViewportMaxMD ? 'var(--app-spacing-navbar-h)' : 0 }}
		>
			{isViewportMaxMD ? <MobileNavbar onToggleNavMenu={onToggleNavMenu} /> : <DesktopNavbar />}

			{navTab === NavTab.MODULE ? (
				<div className={`h-full w-full flex-1 ${pageClassName}`}>{children}</div>
			) : (
				<div className="h-full w-full flex-1">
					{navTab === NavTab.SETTINGS ? (
						<SettingsMenu onClickBack={onToggleSettings} />
					) : (
						<MobileNavMenu onToggleSettings={onToggleSettings} />
					)}
				</div>
			)}
		</div>
	)
}
