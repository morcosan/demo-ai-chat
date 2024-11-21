import { Button, ButtonSize } from '@ds/release'
import { Message } from '../api'
import { AiChatView, useAiChatLayout } from '../state'
import { SubchatIcon } from './subchat-icon'

interface Props extends ReactProps {
	message: Message
	size: ButtonSize
	selected: boolean
}

export const SubchatButton = (props: Props) => {
	const { message, size, selected, className } = props
	const { activeView, setActiveView } = useAiChatLayout()

	const onClickSubchat = () => {
		activeView === AiChatView.MOBILE_CHAT && setActiveView(AiChatView.MOBILE_SUBCHAT)
	}

	return (
		<Button
			tooltip={t('aiChat.action.openSubchat', { count: message.subchatSize })}
			linkHref={`/chat/${message.chatId}?subchat=${message.id}`}
			variant="item-text-default"
			size={size}
			highlight={selected ? 'pressed' : 'default'}
			className={className}
			onClick={onClickSubchat}
		>
			<SubchatIcon count={message.subchatSize || -1} />
		</Button>
	)
}
