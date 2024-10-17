import { AiChatNavMenu } from '@app/biz-modules/ai-chat/nav-menu'
import { SettingsButton } from './_settings-button'

interface Props {
	onToggleSettings(): void
}

export const MobileNavMenu = ({ onToggleSettings }: Props) => {
	return (
		<div className="flex h-full w-full flex-col px-a11y-scrollbar py-scrollbar-w pt-sm-0">
			<AiChatNavMenu />
			<SettingsButton onClick={onToggleSettings} />
		</div>
	)
}
