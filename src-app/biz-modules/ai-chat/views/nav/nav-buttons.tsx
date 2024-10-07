import { Button } from '@ds/release'
import { SubchatIcon } from '../../components/subchat-icon'
import { AiChatTab, useAiChat } from '../../state'

export const AiChatNavButtons = ({ className = '' }: ReactProps) => {
	const { activeTab, allSubchatsPagination, setActiveTab } = useAiChat()

	const onToggleSubchatTab = () => {
		setActiveTab(activeTab === AiChatTab.CHAT ? AiChatTab.SUBCHAT : AiChatTab.CHAT)
	}

	return (
		<Button
			tooltip={`Show subchats (${allSubchatsPagination.count})`}
			variant="item-text-default"
			highlight={activeTab === AiChatTab.SUBCHAT ? 'pressed' : 'default'}
			className={`px-xs-4 ${className}`}
			onClick={onToggleSubchatTab}
		>
			<SubchatIcon count={allSubchatsPagination.count} />
		</Button>
	)
}
