import { SearchResultItem } from '@app/biz-modules/ai-chat/components/search-result-item'
import { Button, Modal, SearchSvg, TextField, TextFieldRef } from '@ds/release'
import { debounce } from 'lodash'
import { useCallback, useRef, useState } from 'react'
import { MIN_SEARCH_LENGTH, SearchResult } from './api'
import { LoadingText } from './components/loading-text'
import { StickyToolbar } from './components/sticky-toolbar'
import { useAiChat } from './state'

export const AiChatNavSearchModal = () => {
	const {
		showsSearch,
		searchPagination,
		searchLoading,
		searchResults,
		searchKeyword,
		canLoadSearchResults,
		loadMoreSearchResults,
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
			width="lg"
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
			) : searchLoading === 'full' ? (
				// FULL LOADING
				<div className="flex-center h-lg-2">
					<LoadingText text={t('aiChat.searchingChats')} />
				</div>
			) : !searchPagination.count || !searchResults.length ? (
				// NO RESULTS
				<div className="flex-center h-lg-2 text-color-text-subtle">{t('aiChat.xSearchResults', { count: 0 })}</div>
			) : (
				// RESULTS
				<div className="flex min-h-lg-2 flex-col">
					<StickyToolbar className="!-top-a11y-padding -mt-a11y-padding mb-xs-3">
						<div className="px-button-px-item pb-xs-5 text-size-sm text-color-text-subtle">
							{t('aiChat.xSearchResults', { count: searchPagination.count })}
						</div>
					</StickyToolbar>

					<ul className="flex flex-col gap-sm-7 pb-button-px-item">
						{searchResults.map((result: SearchResult) => (
							<SearchResultItem
								key={result.id}
								result={result}
								keyword={searchKeyword}
								onClick={() => setShowsSearch(false)}
							/>
						))}
					</ul>

					<div className="mx-auto mt-xs-4">
						{searchLoading === 'more' ? (
							<div className="flex-center h-button-h-md text-size-sm">
								<LoadingText text={t('aiChat.searchingChats')} />
							</div>
						) : (
							Boolean(canLoadSearchResults) && (
								<Button variant="text-default" onClick={loadMoreSearchResults}>
									{t('aiChat.action.showMoreResults')}
								</Button>
							)
						)}
					</div>
				</div>
			)}
		</Modal>
	)
}
