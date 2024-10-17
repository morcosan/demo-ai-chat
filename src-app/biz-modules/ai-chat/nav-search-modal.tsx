import { Modal, SearchSvg, TextField, TextFieldRef } from '@ds/release'
import { debounce } from 'lodash'
import { useCallback, useRef, useState } from 'react'
import { LoadingText } from './components/loading-text'
import { useAiChat } from './state'

export const AiChatNavSearchModal = () => {
	const { showsSearch, searchPagination, searchLoading, searchKeyword, searchByKeyword, setShowsSearch } =
		useAiChat()
	const [searchValue, setSearchValue] = useState('')
	const searchRef = useRef<TextFieldRef>(null)

	const submitSearch = useCallback(
		debounce((value: string) => searchByKeyword(value.trim()), 500),
		[]
	)

	const onChangeSearch = (value: string) => {
		setSearchValue(value)
		submitSearch(value)
	}

	const slotTitle = (
		<TextField
			ref={searchRef}
			id="chat-search"
			value={searchValue}
			placeholder={t('aiChat.action.searchChats')}
			slotLeft={<SearchSvg className="ml-xs-4 mr-xs-1 mt-px h-full w-xs-5 min-w-xs-5" />}
			className="w-full font-weight-sm"
			onChange={onChangeSearch}
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
			{searchKeyword ? (
				searchLoading ? (
					<div className="flex-center h-lg-2 text-color-text-subtle">
						<LoadingText text={t('aiChat.searchingChats')} />
					</div>
				) : searchPagination.count ? (
					<div>Results</div>
				) : (
					<div className="flex-center h-lg-2 text-color-text-subtle">{t('aiChat.noResults')}</div>
				)
			) : (
				<div className="flex-center h-lg-2 text-color-text-subtle">{t('aiChat.action.startSearching')}</div>
			)}
		</Modal>
	)
}
