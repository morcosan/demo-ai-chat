import { Button } from '@ds/release'
import { Message } from '../api'
import { AiChatView, useAiChatLayout } from '../state'
import { SubchatIcon } from './subchat-icon'

interface Props extends ReactProps {
	message: Message
	selected: boolean
	small: boolean
}

export const SubchatButton = (props: Props) => {
	const { message, selected, small, className } = props
	const { activeView, setActiveView, setShowsPanel } = useAiChatLayout()

	const onClickSubchat = () => {
		activeView === AiChatView.MOBILE_CHAT && setActiveView(AiChatView.MOBILE_SUBCHAT)
		selected ? setShowsPanel((value: boolean) => !value) : setShowsPanel(true)
	}

	return (
		<Button
			tooltip={t('aiChat.action.openSubchat', { count: message.subchatSize })}
			linkHref={`/chat/${message.chatId}?subchat=${message.id}`}
			variant={small ? 'text-subtle' : 'item-text-default'}
			size={small ? 'xs' : 'md'}
			highlight={selected ? 'pressed' : 'default'}
			className={className}
			onClick={onClickSubchat}
		>
			<SubchatIcon count={message.subchatSize || -1} small={small} className={cx(small && 'pt-xs-0')} />
		</Button>
	)
}
