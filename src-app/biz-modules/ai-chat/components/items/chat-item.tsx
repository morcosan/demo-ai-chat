import { Button } from '@ds/release'
import { Chat } from '../../api'

interface Props {
	chat: Chat
	selected?: boolean
	onHideNavMenu?(): void
}

export const ChatItem = (props: Props) => {
	const { chat, selected, onHideNavMenu } = props

	return (
		<li>
			<Button
				linkHref={`/chat/${chat.id}`}
				variant={selected ? 'item-solid-secondary' : 'item-text-default'}
				highlight={selected ? 'selected' : 'default'}
				tooltip={chat.title}
				size="sm"
				className="block focus:z-1"
				onClick={onHideNavMenu}
			>
				<span className="truncate text-size-sm">{chat.title}</span>
			</Button>
		</li>
	)
}
