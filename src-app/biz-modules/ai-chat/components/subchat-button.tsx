import { Button } from '@ds/release'
import { Message } from '../api'
import { AiChatView, useAiChatLayout, useAiChatPreview } from '../state'
import { SubchatIcon } from './subchat-icon'

interface Props extends ReactProps {
	message: Message
	selected: boolean
	small: boolean
}

export const SubchatButton = (props: Props) => {
	const { message, selected, small, className } = props
	const { activeView, setActiveView, setShowsPanel } = useAiChatLayout()
	const { previewUrl, closePreview } = useAiChatPreview()

	const onClickSubchat = () => {
		activeView === AiChatView.MOBILE_CHAT && setActiveView(AiChatView.MOBILE_SUBCHAT)

		if (selected) {
			previewUrl ? setShowsPanel(true) : setShowsPanel((value: boolean) => !value)
		} else {
			setShowsPanel(true)
		}

		closePreview()
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
