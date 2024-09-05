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
			<Button linkTo="/chat/0" linkType="same-tab" variant="solid-primary" size="md" expanded>
				<LogoIcon className="-ml-xs-4 mr-xs-3 h-xs-9 w-xs-9" />
				New chat
			</Button>

			<div className="mt-xs-8 px-xs-4 text-size-sm text-color-text-subtle">
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
								linkTo={`/chat/${chat.id}`}
								linkType="same-tab"
								variant={activeChat?.id === chat.id ? 'solid-secondary' : 'text-default'}
								noHover={Boolean(activeChat?.id === chat.id)}
								tooltip={chat.title}
								size="md"
								expanded
							>
								<span className={`w-full truncate px-xs-4 ${activeChat?.id === chat.id ? '' : 'font-weight-sm'}`}>
									{chat.title}
								</span>
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
