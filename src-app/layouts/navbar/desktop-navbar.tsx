import { AiChatNavSection } from '@app/biz-modules/ai-chat/views/nav-section'
import { AppLogo } from '@app/layouts/navbar/_app-logo'
import { UserSettings } from '@app/layouts/navbar/_user-settings'
import { useUiViewport } from '@ds/release'

export const DesktopNavbar = () => {
	const { isViewportMaxSM } = useUiViewport()

	return (
		<nav className="z-sticky h-full min-w-lg-7 max-w-lg-7 bg-color-bg-navbar shadow-lg">
			<div className="flex h-full flex-col px-a11y-scrollbar py-scrollbar-w">
				<AppLogo />

				<AiChatNavSection />

				<UserSettings />
			</div>
		</nav>
	)
}
