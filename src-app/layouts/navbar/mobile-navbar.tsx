import { AiChatSvg } from '@ds/release'

export const MobileNavbar = () => {
	return (
		<nav className="z-sticky max-h-sm-7 min-h-sm-7 w-full border-t border-color-border-shadow bg-color-bg-navbar">
			<div className="flex items-center justify-between">
				<AiChatSvg className="-mr-xs-1 h-sm-5 w-sm-5 animate-pulse" />
			</div>
		</nav>
	)
}
