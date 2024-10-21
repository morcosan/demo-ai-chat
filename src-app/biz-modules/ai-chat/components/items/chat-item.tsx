import { Button } from '@ds/release'
import { Chat } from '../../api'

interface Props {
	chat: Chat
	activeChat: Chat | null
	onHideNavMenu?(): void
}

export const ChatItem = ({ chat, activeChat, onHideNavMenu }: Props) => {
	return (
		<li>
			<Button
				linkHref={`/chat/${chat.id}`}
				variant={activeChat?.id === chat.id ? 'item-solid-secondary' : 'item-text-default'}
				highlight={activeChat?.id === chat.id ? 'selected' : 'default'}
				tooltip={chat.title}
				className="block focus:z-1"
				onClick={onHideNavMenu}
			>
				<span className="truncate">{chat.title}</span>
			</Button>
		</li>
	)
}
