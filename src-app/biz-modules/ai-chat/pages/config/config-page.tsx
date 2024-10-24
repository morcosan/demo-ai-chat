import { AppLayout } from '@app/layouts/app-layout'
import { Button, Modal, WarningSvg } from '@ds/release'
import { uniqBy } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { Chat } from '../../api'
import { Checkbox } from '../../components/checkbox'
import { ChatConfigItem } from '../../components/items/chat-config-item'
import { LoadingText } from '../../components/loading-text'
import { useAiChat } from '../../state'
import { DatabaseReset } from './_database-reset'

export const ConfigPage = () => {
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
	const [chatIdsToRename, setChatIdsToRename] = useState<number[]>([])
	const [showsDeleteModal, setShowsDeleteModal] = useState(false)

	const bulkChecked = selectedChats.length === allChats.length ? true : selectedChats.length === 0 ? false : null
	const bulkTooltip = bulkChecked === true ? t('core.action.deselectAll') : t('core.action.selectAll')
	const bulkText = t('aiChat.xSelectedMessages', { count: selectedChats.length, total: allChats.length })
	const bulkTextClass = cx('ml-xs-2 text-size-sm leading-1', bulkChecked === false && 'text-color-text-subtle')

	const onToggleBulk = useCallback(() => {
		if (bulkChecked === true) {
			setSelectedChats([])
		} else {
			setSelectedChats(allChats.filter((chat: Chat) => !chat.loading && !chat.deleting))
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

	const onToggleRename = (chatId: number, chatIdsToRename: number[]) => {
		chatIdsToRename.includes(chatId)
			? setChatIdsToRename(chatIdsToRename.filter((id: number) => id !== chatId))
			: setChatIdsToRename([...chatIdsToRename, chatId])
	}

	const onSubmitRename = (chatId: number, title: string, chatIdsToRename: number[]) => {
		title = title.replace(/\s*\n+\s*/g, ' ').replace(/\s+/g, ' ') // Remove new lines and spaces
		updateChat(chatId, title)
		onToggleRename(chatId, chatIdsToRename)
	}

	const slotChats = useMemo(
		() => (
			<ul className="flex flex-col gap-xs-4">
				{allChats.map((chat: Chat) => (
					<ChatConfigItem
						key={chat.id}
						chat={chat}
						selected={selectedChats.some((other: Chat) => other.id === chat.id)}
						renaming={chatIdsToRename.includes(chat.id)}
						interactive
						onDelete={() => onClickDeleteChat(chat)}
						onRename={() => onToggleRename(chat.id, chatIdsToRename)}
						onToggle={(selected: boolean) => onToggleChat(chat, selected)}
						onSubmitRename={(title: string) => onSubmitRename(chat.id, title, chatIdsToRename)}
					/>
				))}
			</ul>
		),
		[allChats, selectedChats, chatIdsToRename]
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
			<div className="mb-sm-0 flex items-center lg:mb-sm-3">
				<h1 className="flex items-center">
					<span className="mr-xs-4 text-size-xl font-weight-lg lg:text-size-xxl">{t('aiChat.chats')}</span>
					{allChatsPagination.count > 0 && (
						<span className="mt-xs-1 text-size-md font-weight-md text-color-text-subtle lg:text-size-lg">
							({allChatsPagination.count})
						</span>
					)}
				</h1>

				<DatabaseReset />
			</div>

			{allChatsLoading !== 'full' && allChats.length > 0 && (
				<>
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
							className="ml-xs-9"
							ariaDescription={t('aiChat.action.deleteSelectedChats')}
							style={{ display: bulkChecked === false ? 'none' : 'block' }}
							onClick={() => onClickDeleteBulk(selectedChats)}
						>
							{t('core.action.delete')}
						</Button>
					</div>
					{slotChats}
				</>
			)}

			{!allChatsLoading && allChats.length === 0 && (
				<div className="mt-xs-2 text-size-sm">{t('aiChat.noChats')}</div>
			)}

			{Boolean(allChatsLoading || canLoadAllChats) && (
				<div className="mx-auto mt-sm-2">
					{allChatsLoading ? (
						<div className="flex-center h-button-h-md text-size-sm">
							<LoadingText text={t('aiChat.loadingChats')} />
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
				slotTitle={t('aiChat.action.confirmDeleteChats')}
				slotButtons={
					<Button variant="solid-danger" onClick={onConfirmDelete}>
						{t('core.action.delete')}
					</Button>
				}
				onClose={() => setShowsDeleteModal(false)}
				onClosed={() => setChatsToDelete([])}
			>
				<div className="mb-xs-8 flex items-center text-color-danger">
					<WarningSvg className="mr-xs-4 w-xs-8" />
					{t('aiChat.deleteChatsWarning')}
				</div>
				{slotChatsToDelete}
			</Modal>
		</AppLayout>
	)
}

export default ConfigPage
