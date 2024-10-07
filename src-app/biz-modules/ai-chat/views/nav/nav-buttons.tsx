import { Button } from '@ds/release'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SubchatIcon } from '../../components/subchat-icon'
import { AiChatTab, useAiChat } from '../../state'

export const AiChatNavButtons = ({ className = '' }: ReactProps) => {
	const { activeTab, activeSubchat, allSubchatsPagination, setActiveTab } = useAiChat()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const resetSubchatUrl = () => {
		searchParams.delete('subchat')
		navigate({ search: searchParams.toString() }, { replace: true })
	}

	const onClick = () => {
		resetSubchatUrl()

		if (activeTab === AiChatTab.CHAT) {
			// Wait for reset
			wait(activeSubchat ? 100 : 0).then(() => setActiveTab(AiChatTab.SUBCHAT))
		} else {
			setActiveTab(AiChatTab.CHAT)
		}
	}

	return (
		<Button
			tooltip={`Show subchats (${allSubchatsPagination.count})`}
			variant="item-text-default"
			highlight={activeTab === AiChatTab.SUBCHAT ? 'pressed' : 'default'}
			className={`px-xs-4 ${className}`}
			onClick={onClick}
		>
			<SubchatIcon count={allSubchatsPagination.count} />
		</Button>
	)
}
