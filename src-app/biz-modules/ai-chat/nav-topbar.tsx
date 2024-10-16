import { Button } from '@ds/release'
import { SubchatIcon } from './components/subchat-icon'
import { AiChatView, useAiChat } from './state'

export const AiChatNavTopbar = ({ className }: ReactProps) => {
	const { activeChat, activeView, allSubchatsPagination, setActiveView } = useAiChat()

	const onClick = () => {
		setActiveView(activeView === AiChatView.MOBILE_CHAT ? AiChatView.MOBILE_SUBCHAT : AiChatView.MOBILE_CHAT)
	}

	return activeView !== AiChatView.NONE && activeChat?.id ? (
		<Button
			tooltip={t('aiChat.showSubchats', { count: allSubchatsPagination.count })}
			variant="item-text-default"
			highlight={activeView === AiChatView.MOBILE_SUBCHAT ? 'pressed' : 'default'}
			className={cx('px-xs-4', className)}
			onClick={onClick}
		>
			<SubchatIcon count={allSubchatsPagination.count} />
		</Button>
	) : null
}
