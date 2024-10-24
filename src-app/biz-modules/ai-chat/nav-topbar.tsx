import { Button } from '@ds/release'
import { SubchatIcon } from './components/subchat-icon'
import { AiChatView, useAiChat, useAiChatLayout } from './state'

export const AiChatNavTopbar = ({ className }: ReactProps) => {
	const { activeChat, allSubchatsPagination } = useAiChat()
	const { activeView, setActiveView } = useAiChatLayout()

	const onClick = () => {
		setActiveView(activeView === AiChatView.MOBILE_CHAT ? AiChatView.MOBILE_SUBCHAT : AiChatView.MOBILE_CHAT)
	}

	return activeView !== AiChatView.NONE && activeChat?.id ? (
		<Button
			tooltip={t('aiChat.action.showSubchats', { count: allSubchatsPagination.count })}
			variant="item-text-default"
			highlight={activeView === AiChatView.MOBILE_SUBCHAT ? 'pressed' : 'default'}
			className={cx('px-xs-4', className)}
			onClick={onClick}
		>
			<SubchatIcon count={allSubchatsPagination.count} />
		</Button>
	) : null
}
