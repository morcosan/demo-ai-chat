import { Button } from '@ds/release'
import { Message } from '../api'
import { AiChatView, useAiChatLayout } from '../state'
import { SubchatIcon } from './subchat-icon'

interface Props {
	message: Message
	subchatId?: number
}

export const SubchatButton = ({ message, subchatId }: Props) => {
	const { activeView, setActiveView } = useAiChatLayout()

	const subchatButtonClass = cx({
		'px-xs-3': true,
		'lg:mt-sm-2': message.role === 'agent',
		'focus:opacity-100 lg:opacity-0 lg:group-hover:opacity-100': !message.subchatSize,
		'!opacity-100': message.id === subchatId,
	})

	const onClickSubchat = () => {
		activeView === AiChatView.MOBILE_CHAT && setActiveView(AiChatView.MOBILE_SUBCHAT)
	}

	return (
		<Button
			tooltip={t('aiChat.action.openSubchat', { count: message.subchatSize })}
			linkHref={`/chat/${message.chatId}?subchat=${message.id}`}
			variant="item-text-default"
			highlight={message.id === subchatId ? 'pressed' : 'default'}
			className={subchatButtonClass}
			onClick={onClickSubchat}
		>
			<SubchatIcon count={message.subchatSize || -1} />
		</Button>
	)
}
