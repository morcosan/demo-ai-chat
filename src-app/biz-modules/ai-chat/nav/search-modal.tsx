import { LoadingText } from '@app/library/release'
import { Button, Modal, SearchSvg, TextField, TextFieldRef } from '@ds/release'
import { debounce } from 'lodash'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Agent, MIN_SEARCH_LENGTH } from '../api'
import { SearchResultItem } from '../components/items/search-result-item'
import { StickyToolbar } from '../components/sticky-toolbar'
import { SearchResult, useAiChatAgents, useAiChatSearch } from '../state'

export const AiChatSearchModal = () => {
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
	const { allAgentsForChat, loadMissingAgents } = useAiChatAgents()
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
			placeholder={t('core.placeholder.search')}
			ariaLabel={t('aiChat.action.searchChats')}
			slotLeft={<SearchSvg className="ml-xs-4 mr-xs-1 mt-px h-full w-xs-5 min-w-xs-5" />}
			className="w-full font-weight-sm"
			onChange={onChangeSearch}
		/>
	)

	useEffect(() => {
		loadMissingAgents([
			...new Set(
				searchResults
					.filter((result: SearchResult) => result.message)
					.map((result: SearchResult) => result.message!.agentId)
			),
		])
	}, [searchResults])

	const slotResults = useMemo(
		() => (
			<ul className="mt-xs-3 flex flex-col pb-button-px-item">
				{searchResults.map((result: SearchResult) => (
					<SearchResultItem
						key={result.message?.id || result.chat?.id}
						result={result}
						keyword={searchKeyword}
						agent={allAgentsForChat.find((agent: Agent) => agent.id === result.message?.agentId)}
						onClick={() => setShowsSearch(false)}
					/>
				))}
			</ul>
		),
		[searchResults, searchKeyword, allAgentsForChat]
	)

	return (
		<Modal
			opened={showsSearch}
			width="lg"
			slotTitle={slotTitle}
			noFooter
			onOpened={() => searchRef.current?.focus()}
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
					<LoadingText text={t('core.state.searching')} />
				</div>
			) : !searchPagination.count || !searchResults.length ? (
				// NO RESULTS
				<div className="flex-center h-lg-2 text-color-text-subtle">
					{t('aiChat.label.xSearchResults', { count: 0 })}
				</div>
			) : (
				// RESULTS
				<div className="flex min-h-lg-2 flex-col">
					<StickyToolbar className="!-top-a11y-padding -mt-a11y-padding" stretched>
						<div className="px-button-px-item pb-xs-5 text-size-sm text-color-text-subtle">
							{t('aiChat.label.xSearchResults', { count: searchPagination.count })}
						</div>
					</StickyToolbar>

					{slotResults}

					<div className="mx-auto mb-xs-5 mt-sm-0">
						{searchLoading === 'more' ? (
							<div className="flex-center h-button-h-md text-size-sm">
								<LoadingText text={t('core.state.searching')} />
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
