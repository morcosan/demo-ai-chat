import { Button, Modal, SearchSvg, TextField, TextFieldRef } from '@ds/release'
import { debounce } from 'lodash'
import { useCallback, useRef, useState } from 'react'
import { MIN_SEARCH_LENGTH, SearchResult } from './api'
import { LoadingText } from './components/loading-text'
import { useAiChat } from './state'

export const AiChatNavSearchModal = () => {
	const {
		showsSearch,
		searchPagination,
		searchLoading,
		searchResults,
		searchKeyword,
		canLoadSearchResults,
		searchByKeyword,
		setShowsSearch,
	} = useAiChat()
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
			{!searchKeyword ? (
				// EMPTY STATE
				<div className="flex-center h-lg-2 text-color-text-subtle">
					{t('aiChat.action.startSearching', { count: MIN_SEARCH_LENGTH })}
				</div>
			) : searchLoading ? (
				// LOADING
				<div className="flex-center h-lg-2">
					<LoadingText text={t('aiChat.searchingChats')} />
				</div>
			) : !searchPagination.count || !searchResults.length ? (
				// NO RESULTS
				<div className="flex-center h-lg-2 text-color-text-subtle">{t('aiChat.xSearchResults', { count: 0 })}</div>
			) : (
				<div className="flex min-h-lg-2 flex-col">
					<div className="mb-xs-9 px-button-px-item text-size-sm text-color-text-subtle">
						{t('aiChat.xSearchResults', { count: searchPagination.count })}
					</div>

					<ul className="flex flex-col gap-sm-0 pb-button-px-item">
						{searchResults.map((result: SearchResult) => (
							<li key={result.id} className="flex flex-col">
								<Button linkHref={`/chat/${result.chatId}`} variant="item-text-default">
									<span className="truncate">{result.chat.title}</span>
								</Button>

								<div className="line-clamp-3 px-button-px-item text-size-sm text-color-text-subtle">
									{result.text}
								</div>
							</li>
						))}
					</ul>

					{Boolean(canLoadSearchResults) && (
						<Button variant="text-default" className="mx-auto mt-xs-5">
							{t('aiChat.action.showMoreResults')}
						</Button>
					)}
				</div>
			)}
		</Modal>
	)
}
