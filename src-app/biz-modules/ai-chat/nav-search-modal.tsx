import { Modal, SearchSvg, TextField, TextFieldRef } from '@ds/release'
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
			slotLeft={<SearchSvg className="ml-xs-4 mr-xs-1 mt-px h-full w-xs-5 min-w-xs-5" />}
			className="w-full font-weight-sm"
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
