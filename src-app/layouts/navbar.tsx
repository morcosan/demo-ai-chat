import { AiChatNavSection } from '@app/biz-modules/ai-chat/views/nav-section.tsx'
import { AppLogo } from '@app/layouts/_partials/app-logo.tsx'
import { UserSettings } from '@app/layouts/_partials/user-settings.tsx'

export const NavBar = () => {
	return (
		<nav className="z-sticky flex h-full min-w-lg-7 max-w-lg-7 flex-col bg-color-bg-navbar p-scrollbar-w shadow-lg">
			<AppLogo />

			<AiChatNavSection />

			<UserSettings />
		</nav>
	)
}
