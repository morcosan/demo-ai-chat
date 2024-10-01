import { useAiChat } from '@app/biz-modules/ai-chat/state'
import { AiChatSvg, Button, CloseSvg, DotsSvg, IconButton, SearchSvg, TextField } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent, useState } from 'react'
import { Chat } from '../api/types'

export const AiChatNavSection = () => {
	const { allChats, allChatsLoading, allChatsPagination, activeChat, loadMoreChats } = useAiChat()
	const [search, setSearch] = useState('')

	const searchText = search.trim()

	const onScroll = debounce((event: UIEvent) => {
		const container = event.target as HTMLElement
		const isScrollEnd = container.offsetHeight + container.scrollTop >= container.scrollHeight
		isScrollEnd && loadMoreChats()
	}, 300)

	return (
		<>
			{/* TITLE */}
			<Button linkHref="/chat/0">
				<AiChatSvg className="-ml-xs-4 mr-xs-3 h-xs-9 w-xs-9" />
				New chat
			</Button>

			{/* OPTIONS */}
			<div className="mt-sm-0 flex items-center justify-between">
				<span className="ml-xs-1 text-size-sm text-color-text-subtle">
					Chats{' '}
					{Boolean(allChatsPagination.count) && <span className="text-size-xs">({allChatsPagination.count})</span>}
				</span>
				<IconButton tooltip="Show options" size="sm" className="-mr-xs-0">
					<DotsSvg className="h-xs-8" />
				</IconButton>
			</div>

			{/* SEARCH */}
			<TextField
				id="chat-search"
				value={search}
				placeholder="Search chat..."
				ariaLabel="Search chat"
				size="sm"
				className="mb-xs-4 mt-xs-1"
				slotLeft={<SearchSvg className="ml-xs-2 mr-xs-0 mt-px h-full w-xs-5 min-w-xs-5" />}
				slotRight={
					Boolean(searchText) && (
						<IconButton tooltip="Clear search" variant="text-danger" size="xs" onClick={() => setSearch('')}>
							<CloseSvg className="h-xs-6" />
						</IconButton>
					)
				}
				onChange={setSearch}
			/>

			{/* LISTING */}
			<div
				className="-mx-scrollbar-w flex flex-1 flex-col overflow-y-scroll py-a11y-padding pl-scrollbar-w"
				onScroll={onScroll}
			>
				{allChatsLoading === 'full' ? (
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
								variant={activeChat?.id === chat.id ? 'item-solid-secondary' : 'item-text-default'}
								highlight={activeChat?.id === chat.id ? 'selected' : 'default'}
								tooltip={chat.title}
								className="focus:z-1"
							>
								<span className="truncate">{chat.title}</span>
							</Button>
						))}
						{allChatsLoading === 'more' && (
							<div className="my-xs-6 flex px-xs-4">
								<span className="mr-xs-4 animate-spin">⌛</span>
								Loading more chats...
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