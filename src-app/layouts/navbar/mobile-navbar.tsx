import { AiChatNavTopbar } from '@app/biz-modules/ai-chat/views/nav/nav-topbar'
import { IconButton, MenuSvg } from '@ds/release'
import { AppLogo } from './_app-logo'

interface Props {
	hasMenu: boolean
	onToggleNavMenu(): void
}

export const MobileNavbar = ({ hasMenu, onToggleNavMenu }: Props) => {
	return (
		<nav
			className="fixed left-0 top-0 z-navbar w-full border-t border-color-border-shadow shadow-sm"
			style={{ minHeight: 'var(--app-spacing-navbar-h)', height: 'var(--app-spacing-navbar-h)' }}
		>
			<div className="flex h-full items-center px-xs-2" style={{ background: 'var(--app-color-bg-navbar)' }}>
				{/* MENU */}
				<IconButton tooltip={t('core.action.openMenu')} pressed={hasMenu} onClick={onToggleNavMenu}>
					<MenuSvg className="h-xs-9" />
				</IconButton>

				{/* LOGO */}
				<AppLogo className="ml-xs-3" mobile />

				{/* SUBCHATS */}
				<AiChatNavTopbar className="ml-auto" />
			</div>
		</nav>
	)
}
