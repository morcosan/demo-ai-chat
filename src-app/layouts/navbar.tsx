import { AiChatNavSection } from '@app/biz-modules/ai-chat/views/nav-section.tsx'
import { AppLogo } from '@app/layouts/_partials/app-logo.tsx'
import { UserSettings } from '@app/layouts/_partials/user-settings.tsx'

export const NavBar = () => {
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
