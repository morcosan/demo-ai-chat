import { Button } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent } from 'react'
import { Subchat } from '../api'
import { LoadingText } from '../components/loading-text'
import { StickyToolbar } from '../components/sticky-toolbar'
import { SubchatIcon } from '../components/subchat-icon'
import { useAiChat } from '../state'

export const SubchatsView = () => {
	const { allSubchats, allSubchatsLoading, allSubchatsPagination, loadMoreSubchats } = useAiChat()

	const onScroll = debounce((event: UIEvent) => {
		const container = event.target as HTMLElement
		const isScrollEnd = container.offsetHeight + container.scrollTop >= container.scrollHeight
		isScrollEnd && loadMoreSubchats()
	}, 300)

	return (
		<div className="h-full py-xs-1">
			<div className="h-full overflow-y-scroll pb-xs-9 pl-scrollbar-w pr-a11y-padding" onScroll={onScroll}>
				{/* TOOLBAR */}
				<StickyToolbar className="-mx-a11y-padding mb-xs-2 px-xs-9 py-xs-1" permanent>
					<div className="flex h-button-h-sm items-center text-size-sm">
						{t('aiChat.subchats')} ({allSubchatsPagination.count})
					</div>
				</StickyToolbar>

				{allSubchats.map((subchat: Subchat) => (
					<Button
						key={subchat.id}
						linkHref={`/chat/${subchat.chatId}?subchat=${subchat.id}`}
						variant="item-text-default"
						size="lg"
						className="block"
					>
						<SubchatIcon count={subchat.size} className="mr-xs-4 min-w-sm-3" />
						<span className="line-clamp-1 pb-xs-0">{subchat.text}</span>
					</Button>
				))}
				{allSubchats.length < allSubchatsPagination.count && (
					<LoadingText
						text={t('aiChat.loadingSubchats')}
						className="min-h-sm-4 pl-sm-0 text-size-sm"
						style={{ visibility: allSubchatsLoading === 'more' ? 'visible' : 'hidden' }}
					/>
				)}
			</div>
		</div>
	)
}
