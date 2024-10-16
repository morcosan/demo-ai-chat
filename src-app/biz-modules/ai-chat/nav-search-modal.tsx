import { CloseSvg, IconButton, Modal, SearchSvg, TextField, TextFieldRef } from '@ds/release'
import { useRef, useState } from 'react'
import { useAiChat } from './state'

export const AiChatNavSearchModal = () => {
	const { showsSearch, setShowsSearch } = useAiChat()
	const [search, setSearch] = useState('')
	const searchRef = useRef<TextFieldRef>(null)

	const searchText = search.trim()

	const slotTitle = (
		<TextField
			ref={searchRef}
			id="chat-search"
			value={search}
			placeholder={t('aiChat.action.searchChats')}
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
	)

	return (
		<Modal
			opened={showsSearch}
			width="md"
			slotTitle={slotTitle}
			shallow
			noFooter
			onOpen={() => searchRef.current?.focus()}
			onClose={() => setShowsSearch(false)}
		>
			test
		</Modal>
	)
}
