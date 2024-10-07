import { MobileNavbar, NavTab } from '@app/layouts/navbar/mobile-navbar'
import { NavMenu } from '@app/layouts/navbar/nav-menu'
import { useUiViewport } from '@ds/release'
import { useState } from 'react'
import { DesktopNavbar } from './navbar/desktop-navbar'

interface Props extends ReactProps {
	pageClassName?: string
}

export const AppLayout = ({ pageClassName = '', children }: Props) => {
	const [navTab, setNavTab] = useState<NavTab>(NavTab.MODULE)
	const { isViewportMaxMD } = useUiViewport()

	const onToggleMenu = () => setNavTab(navTab === NavTab.MENU ? NavTab.MODULE : NavTab.MENU)

	return (
		<div
			className={`flex ${isViewportMaxMD ? 'flex-col' : ''} h-screen w-screen`}
			style={{ paddingTop: isViewportMaxMD ? 'var(--app-spacing-navbar-h)' : 0 }}
		>
			{isViewportMaxMD ? <MobileNavbar onToggleMenu={onToggleMenu} /> : <DesktopNavbar />}

			<div className={`h-full w-full flex-1 ${pageClassName}`}>
				{navTab === NavTab.MENU ? <NavMenu className="pt-sm-0" /> : children}
			</div>
		</div>
	)
}
