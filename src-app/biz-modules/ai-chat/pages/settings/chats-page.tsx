import { AppLayout } from '@app/layouts/app-layout'
import { Checkbox, LoadingText, PageHeader } from '@app/library/release'
import { Button, Modal, WarningSvg } from '@ds/release'
import { uniqBy } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { Chat } from '../../api'
import { ChatConfigItem } from '../../components/items/chat-config-item'
import { useAiChat } from '../../state'

export const ChatsPage = () => {
	const {
		allChats,
		allChatsLoading,
		allChatsPagination,
		canLoadAllChats,
		deleteChats,
		loadMoreChats,
		updateChat,
	} = useAiChat()
	const [selectedChats, setSelectedChats] = useState<Chat[]>([])
	const [chatsToDelete, setChatsToDelete] = useState<Chat[]>([])
	const [showsDeleteModal, setShowsDeleteModal] = useState(false)

	const bulkChecked = selectedChats.length === allChats.length ? true : selectedChats.length === 0 ? false : null
	const bulkTooltip = bulkChecked === true ? t('core.action.deselectAll') : t('core.action.selectAll')
	const bulkText = t('aiChat.label.xSelectedMessages', { count: selectedChats.length })
	const bulkTextClass = cx('ml-xs-2 text-size-sm leading-1', bulkChecked === false && 'text-color-text-subtle')

	const onToggleBulk = useCallback(() => {
		if (bulkChecked === true) {
			setSelectedChats([])
		} else {
			setSelectedChats(allChats.filter((chat: Chat) => !chat.updating && !chat.deleting))
		}
	}, [bulkChecked, allChats])

	const onToggleChat = (chat: Chat, selected: boolean) => {
		if (selected) {
			setSelectedChats(uniqBy([...selectedChats, chat], (other: Chat) => other.id))
		} else {
			setSelectedChats(selectedChats.filter((other: Chat) => other.id !== chat.id))
		}
	}

	const onClickDeleteChat = (chat: Chat) => {
		setChatsToDelete([chat])
		setShowsDeleteModal(true)
	}

	const onClickDeleteBulk = (chats: Chat[]) => {
		setChatsToDelete(chats)
		setShowsDeleteModal(true)
	}

	const onConfirmDelete = () => {
		deleteChats(chatsToDelete.map((chat: Chat) => chat.id))
		setChatsToDelete([])
		setSelectedChats([])
	}

	const onRename = (chatId: number, title: string) => {
		title = title.replace(/\s*\n+\s*/g, ' ').replace(/\s+/g, ' ') // Remove new lines and spaces
		updateChat(chatId, title)
	}

	const slotChats = useMemo(
		() => (
			<ul className="flex flex-col gap-xs-4">
				{allChats.map((chat: Chat) => (
					<ChatConfigItem
						key={chat.id}
						chat={chat}
						selected={selectedChats.some((other: Chat) => other.id === chat.id)}
						onDelete={() => onClickDeleteChat(chat)}
						onToggle={(selected: boolean) => onToggleChat(chat, selected)}
						onRename={(title: string) => onRename(chat.id, title)}
					/>
				))}
			</ul>
		),
		[allChats, selectedChats]
	)

	const slotChatsToDelete = useMemo(
		() => (
			<ul className="flex flex-col gap-xs-4">
				{chatsToDelete.map((chat: Chat) => (
					<ChatConfigItem key={chat.id} chat={chat} />
				))}
			</ul>
		),
		[chatsToDelete]
	)

	return (
		<AppLayout blank>
			<PageHeader
				breadcrumb={{ href: '/settings', title: t('core.label.settings') }}
				slotTitle={
					<>
						{t('aiChat.label.chats')}
						{allChatsPagination.count > 0 && (
							<span className="ml-xs-4 mt-xs-1 text-size-md font-weight-md text-color-text-subtle lg:text-size-lg">
								({allChatsPagination.count})
							</span>
						)}
					</>
				}
			/>

			{/* LISTING */}
			{allChatsLoading !== 'full' && allChats.length > 0 && (
				<>
					{/* TOOLBAR */}
					<div className="mb-xs-7 flex items-center border-b border-color-border-subtle px-xs-2 pb-xs-2">
						<Checkbox
							checked={bulkChecked}
							tooltip={bulkTooltip}
							ariaDescription={bulkText}
							onChange={onToggleBulk}
						/>
						<span className={bulkTextClass}>{bulkText}</span>

						<Button
							variant="solid-danger"
							size="xs"
							ariaDescription={t('aiChat.action.deleteSelectedChats')}
							className={cx('ml-xs-9', bulkChecked === false ? 'hidden' : 'block')}
							onClick={() => onClickDeleteBulk(selectedChats)}
						>
							{t('core.action.delete')}
						</Button>
					</div>

					{slotChats}
				</>
			)}

			{/* EMPTY STATE */}
			{!allChatsLoading && allChats.length === 0 && (
				<div className="mt-xs-2 text-size-sm">{t('aiChat.label.noChats')}</div>
			)}

			{/* LOADING */}
			{Boolean(allChatsLoading || canLoadAllChats) && (
				<div className="mx-auto mt-sm-2">
					{allChatsLoading ? (
						<div className="flex-center h-button-h-md text-size-sm">
							<LoadingText text={t('aiChat.state.loadingChats')} />
						</div>
					) : (
						Boolean(canLoadAllChats) && (
							<Button variant="text-default" onClick={() => loadMoreChats()}>
								{t('aiChat.action.showMoreChats')}
							</Button>
						)
					)}
				</div>
			)}

			{/* DELETE MODAL */}
			<Modal
				opened={Boolean(chatsToDelete.length && showsDeleteModal)}
				title={t('aiChat.action.confirmDeleteChats')}
				actions={
					<Button variant="solid-danger" onClick={onConfirmDelete}>
						{t('core.action.delete')}
					</Button>
				}
				onClose={() => setShowsDeleteModal(false)}
				onClosed={() => setChatsToDelete([])}
			>
				<div className="mb-xs-8 flex items-center text-color-danger-page-text">
					<WarningSvg className="mr-xs-4 w-xs-8" />
					{t('aiChat.warning.deletingChats')}
				</div>
				{slotChatsToDelete}
			</Modal>
		</AppLayout>
	)
}

export default ChatsPage
