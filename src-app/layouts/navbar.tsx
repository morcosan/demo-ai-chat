import { AiChatNavSection } from '@app/biz-modules/ai-chat/nav/nav-section.tsx'
import { AppLogo } from './partials/app-logo.tsx'
import { UserSettings } from './partials/user-settings.tsx'

export const NavBar = () => {
	return (
		<nav className="z-sticky flex h-full min-w-lg-7 max-w-lg-7 flex-col gap-xs-4 bg-color-bg-navbar p-xs-4 shadow-lg">
			<AppLogo />

			<AiChatNavSection />

			<UserSettings />
		</nav>
	)
}
