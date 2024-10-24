import { Button, Modal, SearchSvg, TextField, TextFieldRef } from '@ds/release'
import { debounce } from 'lodash'
import { useCallback, useMemo, useRef, useState } from 'react'
import { MIN_SEARCH_LENGTH } from './api'
import { SearchResultItem } from './components/items/search-result-item'
import { LoadingText } from './components/loading-text'
import { StickyToolbar } from './components/sticky-toolbar'
import { SearchResult, useAiChatSearch } from './state'

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
	} = useAiChatSearch()
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
			placeholder={t('core.searchPlaceholder')}
			slotLeft={<SearchSvg className="ml-xs-4 mr-xs-1 mt-px h-full w-xs-5 min-w-xs-5" />}
			className="w-full font-weight-sm"
			onChange={onChangeSearch}
		/>
	)

	const slotResults = useMemo(
		() => (
			<ul className="mt-xs-3 flex flex-col pb-button-px-item">
				{searchResults.map((result: SearchResult) => (
					<SearchResultItem
						key={result.message?.id || result.chat?.id}
						result={result}
						keyword={searchKeyword}
						onClick={() => setShowsSearch(false)}
					/>
				))}
			</ul>
		),
		[searchResults, searchKeyword]
	)

	return (
		<Modal
			opened={showsSearch}
			width="lg"
			slotTitle={slotTitle}
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
					<LoadingText text={t('core.searching')} />
				</div>
			) : !searchPagination.count || !searchResults.length ? (
				// NO RESULTS
				<div className="flex-center h-lg-2 text-color-text-subtle">{t('aiChat.xSearchResults', { count: 0 })}</div>
			) : (
				// RESULTS
				<div className="flex min-h-lg-2 flex-col">
					<StickyToolbar className="!-top-a11y-padding -mt-a11y-padding" stretched>
						<div className="px-button-px-item pb-xs-5 text-size-sm text-color-text-subtle">
							{t('aiChat.xSearchResults', { count: searchPagination.count })}
						</div>
					</StickyToolbar>

					{slotResults}

					<div className="mx-auto mb-xs-5 mt-sm-0">
						{searchLoading === 'more' ? (
							<div className="flex-center h-button-h-md text-size-sm">
								<LoadingText text={t('core.searching')} />
							</div>
						) : (
							Boolean(canLoadSearchResults) && (
								<Button variant="text-default" onClick={loadMoreSearchResults}>
									{t('core.action.searchMore')}
								</Button>
							)
						)}
					</div>
				</div>
			)}
		</Modal>
	)
}
