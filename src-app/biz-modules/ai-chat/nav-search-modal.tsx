import { Button, Modal, SearchSvg, TextField, TextFieldRef } from '@ds/release'
import { useStickyHandler } from '@utils/release'
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
		loadMoreSearchResults,
		searchByKeyword,
		setShowsSearch,
	} = useAiChat()
	const { isSticky, stickyRef } = useStickyHandler()
	const [searchValue, setSearchValue] = useState('')
	const searchRef = useRef<TextFieldRef>(null)

	const stickyClass = cx(
		'sticky -top-a11y-padding z-sticky -mt-a11y-padding mb-xs-5 bg-color-bg-default',
		isSticky && '____ border-b border-color-border-shadow shadow-below-sm'
	)

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
			) : searchLoading === 'full' ? (
				// FULL LOADING
				<div className="flex-center h-lg-2">
					<LoadingText text={t('aiChat.searchingChats')} />
				</div>
			) : !searchPagination.count || !searchResults.length ? (
				// NO RESULTS
				<div className="flex-center h-lg-2 text-color-text-subtle">{t('aiChat.xSearchResults', { count: 0 })}</div>
			) : (
				<div className="flex min-h-lg-2 flex-col">
					<div ref={stickyRef} className={stickyClass}>
						<div className="px-button-px-item pb-xs-4 text-size-sm text-color-text-subtle">
							{t('aiChat.xSearchResults', { count: searchPagination.count })}
						</div>
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
