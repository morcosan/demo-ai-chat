import { AiChatNavMenu } from '@app/biz-modules/ai-chat/nav/nav-menu'
import { IconButton, PinSvg } from '@ds/release'
import { useEffect, useRef, useState } from 'react'
import { useAppLayout } from '../state'
import { AppLogo } from './_app-logo'
import { SettingsButton } from './_settings-button'
import { SettingsMenu } from './_settings-menu'

interface Props {
	unselected?: boolean
	onClickLanguage(): void
}

export const DesktopNavbar = ({ unselected, onClickLanguage }: Props) => {
	const { isNavPinned, setIsNavPinned } = useAppLayout()
	const [isSettingsOpened, setIsSettingsOpened] = useState(false)
	const [hasNavHover, setHasNavHover] = useState(false)
	const [hasNavFocus, setHasNavFocus] = useState(false)

	const navbarRef = useRef<HTMLDivElement>(null)
	const settingsRef = useRef<HTMLDivElement>(null)

	const isNavCollapsed = !hasNavHover && !isNavPinned

	const settingsMenuClass = cx(
		isSettingsOpened ? 'block' : 'hidden',
		'absolute bottom-0 right-0 z-popup translate-x-full shadow-lg',
		'w-lg-7 rounded-md border border-color-border-shadow bg-color-bg-default'
	)

	const expandedClass = 'w-lg-7 min-w-lg-7'
	const collapsedClass = 'w-md-3 min-w-md-3'
	const navbarClass = cx(
		`absolute left-0 top-0 z-navbar h-full`,
		isNavCollapsed ? collapsedClass : expandedClass,
		'flex flex-col px-a11y-scrollbar py-scrollbar-w',
		'border-r border-color-border-shadow shadow-lg'
	)

	const pinClass = cx(
		'h-xs-6',
		isNavPinned ? 'text-color-secondary-text-default' : 'rotate-45 text-color-text-subtle'
	)

	const onClickLanguageItem = () => {
		setIsSettingsOpened(false)
		onClickLanguage()
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
		window.addEventListener('mousedown', onClickWindow)

		return () => {
			window.removeEventListener('mousedown', onClickWindow)
		}
	}, [])

	return (
		<div className={cx('relative h-full', isNavPinned ? expandedClass : collapsedClass)}>
			{/* NAV OVERLAY */}
			<div
				className={cx('absolute-overlay z-tooltip', !isNavCollapsed && 'hidden')}
				onMouseDown={onMouseDownNavOverlay}
				onMouseEnter={() => setHasNavHover(true)}
			/>

			{/* PAGE OVERLAY */}
			<div className={isNavCollapsed || isNavPinned ? 'hidden' : 'fixed-overlay z-navbar backdrop-blur-subtle'} />

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
					className={cx('absolute right-xs-1 top-xs-1', isNavCollapsed && 'hidden')}
					onClick={() => setIsNavPinned(!isNavPinned)}
				>
					<PinSvg className={pinClass} />
				</IconButton>

				{/* AI CHAT */}
				<AiChatNavMenu collapsed={isNavCollapsed} unselected={unselected} />

				{/* SETTINGS */}
				<div ref={settingsRef} className="relative">
					<SettingsButton
						highlight={isSettingsOpened ? 'pressed' : 'default'}
						collapsed={isNavCollapsed}
						onClick={onToggleSettings}
					/>
					<div className={settingsMenuClass}>
						<SettingsMenu onClickLanguage={onClickLanguageItem} />
					</div>
				</div>
			</nav>
		</div>
	)
}
