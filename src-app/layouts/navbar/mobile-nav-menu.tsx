import { AiChatNavMenu } from '@app/biz-modules/ai-chat/nav/nav-menu'
import { SettingsButton } from './_settings-button'

interface Props {
	unselected?: boolean
	onHideNavMenu(): void
	onToggleSettings(): void
}

export const MobileNavMenu = ({ unselected, onHideNavMenu, onToggleSettings }: Props) => {
	return (
		<div className="flex h-full w-full flex-col px-a11y-scrollbar py-scrollbar-w pt-sm-0">
			<AiChatNavMenu unselected={unselected} onHideNavMenu={onHideNavMenu} />
			<SettingsButton onClick={onToggleSettings} />
		</div>
	)
}
