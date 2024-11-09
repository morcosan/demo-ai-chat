import { AgentItem } from '@app/biz-modules/ai-chat/components/items/agent-item'
import { NavListing } from '@app/biz-modules/ai-chat/components/nav-listing'
import { AiChatSvg, Button, SearchSvg, useUiTheme } from '@ds/release'
import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { Agent, Chat } from '../api'
import { ChatItem } from '../components/items/chat-item'
import { useAiChat, useAiChatAgents, useAiChatSearch } from '../state'

interface Props {
	collapsed?: boolean
	unselected?: boolean
	onHideNavMenu?(): void
}

export const AiChatNavMenu = (props: Props) => {
	const { collapsed, unselected, onHideNavMenu } = props
	const { $spacing } = useUiTheme()
	const { allChats, allChatsLoading, allChatsPagination, activeChat, loadMoreChats, resetActiveChat } = useAiChat()
	const { allAgents, allAgentsPagination, allAgentsLoading, chatViewAgentId, loadMoreAgents, setChatViewAgentId } =
		useAiChatAgents()
	const { setShowsSearch } = useAiChatSearch()
	const location = useLocation()

	const hasExtraChat = Boolean(activeChat && !allChats.some((chat: Chat) => chat.id === activeChat.id))

	useEffect(() => {
		unselected && activeChat && resetActiveChat()
	}, [])

	const slotAgents = useMemo(
		() => (
			<ul>
				{allAgents.map((agent: Agent) => (
					<AgentItem
						key={agent.id}
						agent={agent}
						selected={chatViewAgentId === agent.id && location.pathname === '/chat'}
						onClick={() => {
							setChatViewAgentId(agent.id)
							onHideNavMenu?.()
						}}
					/>
				))}
			</ul>
		),
		[allAgents, chatViewAgentId, location]
	)

	const slotChats = useMemo(
		() => (
			<ul>
				{allChats.map((chat: Chat) => (
					<ChatItem
						key={chat.id}
						chat={chat}
						selected={activeChat?.id === chat.id}
						onHideNavMenu={onHideNavMenu}
					/>
				))}
			</ul>
		),
		[allChats, activeChat]
	)

	return (
		<>
			{/* NEW CHAT */}
			<Button linkHref="/chat" loading={allChatsLoading === 'update'} onClick={onHideNavMenu}>
				<div className={cx(!collapsed && '-ml-xs-4 mr-xs-3')}>
					<AiChatSvg className="h-xs-9 w-xs-9" />
				</div>
				<span className={cx(collapsed && 'hidden')}>{t('aiChat.label.newChat')}</span>
			</Button>

			{/* SEARCH */}
			<Button variant="ghost-primary" className="mt-xs-7" onClick={() => setShowsSearch(true)}>
				<SearchSvg className="w-xs-5 min-w-xs-5" />
				{!collapsed && <span className="ml-xs-3">{t('core.action.search')}</span>}
			</Button>

			{/* AGENTS */}
			<NavListing
				length={allAgents.length}
				loading={allAgentsLoading}
				pagination={allAgentsPagination}
				headerText={t('aiChat.label.agents')}
				settingsHref="/settings/agents"
				settingsText={t('aiChat.action.manageAgents')}
				loadingText={t('aiChat.state.loadingAgents')}
				emptyText=""
				headerClass="mt-xs-9"
				listingStyle={{ maxHeight: `calc(4 * ${$spacing['button-h-md']} + ${$spacing['a11y-padding']})` }}
				collapsed={collapsed}
				onScrollEnd={loadMoreAgents}
			>
				{slotAgents}
			</NavListing>

			{/* CHATS */}
			<NavListing
				length={allChats.length}
				loading={allChatsLoading}
				pagination={allChatsPagination}
				headerText={t('aiChat.label.chats')}
				settingsHref="/settings/chats"
				settingsText={t('aiChat.action.manageChats')}
				loadingText={t('aiChat.state.loadingChats')}
				emptyText={t('aiChat.label.noChats')}
				headerClass="mt-xs-6"
				listingClass="flex-1"
				collapsed={collapsed}
				onScrollEnd={loadMoreChats}
			>
				{slotChats}
			</NavListing>

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
