import { AiChatNavSection } from '@app/biz-modules/ai-chat/views/nav-section'
import { SettingsButton } from './_settings-button'

interface Props {
	onToggleSettings(): void
}

export const MobileNavMenu = ({ onToggleSettings }: Props) => {
	return (
		<div className="flex h-full w-full flex-col px-a11y-scrollbar py-scrollbar-w pt-sm-0">
			<AiChatNavSection />
			<SettingsButton onClick={onToggleSettings} />
		</div>
	)
}
