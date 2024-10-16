import { AiChatSvg, Button, DotsSvg, IconButton, SearchSvg } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent, useState } from 'react'
import { Chat } from '../../api/types'
import { LoadingText } from '../../components/loading-text'
import { useAiChat } from '../../state'

interface Props {
	collapsed?: boolean
}

export const AiChatNavMenu = ({ collapsed }: Props) => {
	const { allChats, allChatsLoading, allChatsPagination, activeChat, loadMoreChats } = useAiChat()
	const [search, setSearch] = useState('')

	const searchText = search.trim()

	const onScrollChats = debounce((event: UIEvent) => {
		const container = event.target as HTMLElement
		const isScrollEnd = container.offsetHeight + container.scrollTop >= container.scrollHeight
		isScrollEnd && loadMoreChats()
	}, 300)

	const hasExtraChat = Boolean(activeChat && !allChats.some((chat: Chat) => chat.id === activeChat.id))

	return (
		<>
			{/* NEW CHAT */}
			<Button linkHref="/chat" loading={allChatsLoading === 'update'}>
				<div className={cx(!collapsed && '-ml-xs-4 mr-xs-3')}>
					<AiChatSvg className="h-xs-9 w-xs-9" />
				</div>
				<span className={cx(collapsed && 'hidden')}>{t('aiChat.newChat')}</span>
			</Button>

			{/* SEARCH */}
			<Button variant="ghost-primary" className="mt-xs-7">
				<SearchSvg className="w-xs-5 min-w-xs-5" />
				{!collapsed && <span className="ml-xs-3">{t('aiChat.action.searchChats')}</span>}
			</Button>

			{/* OPTIONS */}
			<div className="mt-xs-5 flex h-button-h-sm w-full items-center justify-between">
				<span className="ml-button-px-item truncate text-size-sm text-color-text-subtle">
					{t('aiChat.chats')}
					&nbsp;
					{Boolean(allChatsPagination.count) && <span className="text-size-xs">({allChatsPagination.count})</span>}
				</span>
				<IconButton tooltip="Show options" size="sm" className={cx(collapsed && 'hidden')}>
					<DotsSvg className="h-xs-8" />
				</IconButton>
			</div>

			{/* LISTING */}
			<div
				className="-mx-a11y-scrollbar flex flex-1 flex-col overflow-y-scroll p-a11y-padding !pl-a11y-scrollbar"
				style={{ width: 'calc(100% + 2 * var(--ds-spacing-a11y-scrollbar))' }}
				onScroll={onScrollChats}
			>
				{allChatsLoading === 'full' ? (
					<LoadingText
						text={t('aiChat.loadingChats')}
						collapsed={collapsed}
						className="min-h-sm-4 px-button-px-item text-size-sm"
					/>
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
								<span className="line-clamp-1">{chat.title}</span>
							</Button>
						))}
						{allChats.length < allChatsPagination.count && (
							<LoadingText
								text={t('aiChat.loadingChats')}
								collapsed={collapsed}
								className="line-clamp-1 min-h-sm-4 px-button-px-item text-size-sm"
								style={{ visibility: allChatsLoading === 'more' ? 'visible' : 'hidden' }}
							/>
						)}
					</>
				) : (
					<div className="mt-xs-2 flex px-xs-4">No chats</div>
				)}
			</div>

			{/* EXTRA ACTIVE CHAT */}
			{Boolean(hasExtraChat) && (
				<Button
					linkHref={`/chat/${activeChat?.id}`}
					variant="item-solid-secondary"
					highlight="selected"
					tooltip={activeChat?.title}
					className="mb-a11y-padding w-full focus:z-1"
				>
					<span className="line-clamp-1">{activeChat?.title}</span>
				</Button>
			)}
		</>
	)
}
