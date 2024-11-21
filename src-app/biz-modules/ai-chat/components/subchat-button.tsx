import { Button } from '@ds/release'
import { Message } from '../api'
import { AiChatView, useAiChatLayout } from '../state'
import { SubchatIcon } from './subchat-icon'

interface Props extends ReactProps {
	message: Message
	subchatId?: number
}

export const SubchatButton = ({ message, subchatId, className }: Props) => {
	const { activeView, setActiveView } = useAiChatLayout()

	const onClickSubchat = () => {
		activeView === AiChatView.MOBILE_CHAT && setActiveView(AiChatView.MOBILE_SUBCHAT)
	}

	return (
		<Button
			tooltip={t('aiChat.action.openSubchat', { count: message.subchatSize })}
			linkHref={`/chat/${message.chatId}?subchat=${message.id}`}
			variant="item-text-default"
			highlight={message.id === subchatId ? 'pressed' : 'default'}
			className={className}
			onClick={onClickSubchat}
		>
			<SubchatIcon count={message.subchatSize || -1} />
		</Button>
	)
}
