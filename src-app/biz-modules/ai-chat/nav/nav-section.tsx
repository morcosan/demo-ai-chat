import { useAiChatStore } from '@app/biz-modules/ai-chat/state'
import { Button } from '@ds/release'
import LogoIcon from '@ds/release/assets/logo.svg'
import { debounce } from 'lodash'
import { UIEvent } from 'react'
import { Chat } from '../api/types'

export const AiChatNavSection = () => {
	const { allChats, allChatsLoading, moreChatsLoading, chatPagination, activeChat, loadMoreChats } =
		useAiChatStore()

	const onScroll = debounce((event: UIEvent) => {
		const container = event.target as HTMLElement
		const isScrollEnd = container.offsetHeight + container.scrollTop >= container.scrollHeight
		isScrollEnd && loadMoreChats()
	}, 300)

	return (
		<>
			<Button linkHref="/chat/0">
				<LogoIcon className="-ml-xs-4 mr-xs-3 h-xs-9 w-xs-9" />
				New chat
			</Button>

			<div className="mt-xs-8 px-button-px-item text-size-sm text-color-text-subtle">
				Chats {Boolean(chatPagination.count) && <span className="text-size-xs">({chatPagination.count})</span>}
			</div>

			<div className="-mr-xs-4 flex flex-1 flex-col overflow-y-auto pr-xs-4" onScroll={onScroll}>
				{allChatsLoading ? (
					<div className="mt-xs-2 flex px-xs-4">
						<span className="mr-xs-4 animate-spin">⌛</span>
						Loading chats...
					</div>
				) : allChats.length ? (
					<>
						{allChats.map((chat: Chat) => (
							<Button
								key={chat.id}
								linkHref={`/chat/${chat.id}`}
								variant="item-text-default"
								pressed={Boolean(activeChat?.id === chat.id)}
								tooltip={chat.title}
								className={activeChat?.id === chat.id ? '!border border-color-primary' : ''}
							>
								<span className="truncate">{chat.title}</span>
							</Button>
						))}
						{Boolean(moreChatsLoading) && (
							<div className="my-xs-6 flex px-xs-4">
								<span className="mr-xs-4 animate-spin">⌛</span>
								Loading chats...
							</div>
						)}
					</>
				) : (
					<div className="mt-xs-2 flex px-xs-4">There are no chats</div>
				)}
			</div>
		</>
	)
}
