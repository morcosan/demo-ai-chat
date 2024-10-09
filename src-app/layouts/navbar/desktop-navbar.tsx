import { AiChatNavMenu } from '@app/biz-modules/ai-chat/views/nav/nav-menu'
import { IconButton, PinSvg, useUiViewport } from '@ds/release'
import { useEffect, useRef, useState } from 'react'
import { AppLogo } from './_app-logo'
import { SettingsButton } from './_settings-button'
import { SettingsMenu } from './_settings-menu'

const COOKIE__PINNED_NAVBAR = 'app-pinned-navbar'

export const DesktopNavbar = () => {
	const { isViewportMinXL } = useUiViewport()
	const [isSettingsOpened, setIsSettingsOpened] = useState(false)
	const [isNavPinned, setIsNavPinned] = useState(false)
	const [hasNavHover, setHasNavHover] = useState(false)
	const [hasNavFocus, setHasNavFocus] = useState(false)

	const navbarRef = useRef<HTMLDivElement>(null)
	const settingsRef = useRef<HTMLDivElement>(null)

	const isNavCollapsed = !hasNavHover && !isNavPinned

	const settingsMenuClass = [
		isSettingsOpened ? 'block' : 'hidden',
		'absolute bottom-0 right-0 translate-x-full z-popup shadow-lg',
		'w-lg-6 bg-color-bg-default border border-color-border-shadow rounded-md',
	].join(' ')

	const expandedClass = 'w-lg-7 min-w-lg-7'
	const collapsedClass = 'w-md-3 min-w-md-3'
	const navbarClass = [
		`absolute left-0 top-0 h-full z-navbar`,
		isNavCollapsed ? collapsedClass : expandedClass,
		'flex flex-col px-a11y-scrollbar py-scrollbar-w',
		'border-r border-color-border-shadow shadow-lg',
	].join(' ')

	const pinClass = [
		'h-xs-6',
		isNavPinned ? 'fill-color-secondary-text-default' : 'rotate-45 fill-color-text-subtle',
	].join(' ')

	const loadPinConfig = () => {
		const cookie = localStorage.getItem(COOKIE__PINNED_NAVBAR)
		const isPinned = cookie === 'true' || (cookie !== 'false' && isViewportMinXL)

		localStorage.setItem(COOKIE__PINNED_NAVBAR, isPinned ? 'true' : 'false')
		setIsNavPinned(isPinned)
	}

	const onClickPin = () => {
		setIsNavPinned(!isNavPinned)
		localStorage.setItem(COOKIE__PINNED_NAVBAR, !isNavPinned ? 'true' : 'false')
	}

	const onClickWindow = (event: MouseEvent) => {
		const target = event.target as HTMLElement
		const settings = settingsRef.current
		const navbar = navbarRef.current

		!settings?.contains(target) && setIsSettingsOpened(false)
		!navbar?.contains(target) && setHasNavHover(false)
	}

	const onToggleSettings = () => {
		const opened = !isSettingsOpened
		!opened && setHasNavHover(false)
		setIsSettingsOpened(opened)
	}

	const onMouseDownNavOverlay = (event: ReactMouseEvent) => {
		event.stopPropagation()
		setHasNavHover(true)
		setHasNavFocus(true)
	}

	const onMouseLeaveNavbar = () => {
		!hasNavFocus && setHasNavHover(isSettingsOpened)
		setHasNavFocus(false)
	}

	useEffect(() => {
		loadPinConfig()
		window.addEventListener('mousedown', onClickWindow)

		return () => {
			window.removeEventListener('mousedown', onClickWindow)
		}
	}, [])

	return (
		<div className={`relative h-full ${isNavPinned ? expandedClass : collapsedClass}`}>
			{/* NAV OVERLAY */}
			<div
				className="absolute-overlay z-tooltip"
				style={{ display: isNavCollapsed ? 'block' : 'none' }}
				onMouseDown={onMouseDownNavOverlay}
				onMouseEnter={() => setHasNavHover(true)}
			/>

			{/* PAGE OVERLAY */}
			<div className={isNavCollapsed || isNavPinned ? 'hidden' : 'fixed-overlay z-navbar backdrop-blur-xs'} />

			{/* NAVBAR */}
			<nav
				ref={navbarRef}
				className={navbarClass}
				style={{ background: 'var(--app-color-bg-navbar)' }}
				onMouseLeave={onMouseLeaveNavbar}
			>
				{/* LOGO */}
				<AppLogo collapsed={isNavCollapsed} className="mb-xs-9" />

				{/* PIN */}
				<IconButton
					tooltip={isNavPinned ? 'Unpin nav menu' : 'Pin nav menu'}
					className={`absolute right-xs-1 top-xs-1 ${isNavCollapsed ? 'hidden' : ''}`}
					onClick={onClickPin}
				>
					<PinSvg className={pinClass} />
				</IconButton>

				{/* AI CHAT */}
				<AiChatNavMenu collapsed={isNavCollapsed} />

				{/* SETTINGS */}
				<div ref={settingsRef} className="relative">
					<SettingsButton
						highlight={isSettingsOpened ? 'pressed' : 'default'}
						collapsed={isNavCollapsed}
						onClick={onToggleSettings}
					/>
					<div className={settingsMenuClass}>
						<SettingsMenu />
					</div>
				</div>
			</nav>
		</div>
	)
}
