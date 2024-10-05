import { Button } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent } from 'react'
import { Subchat } from '../api/types'
import { LoadingText } from '../components/loading-text'
import { StickyToolbar } from '../components/sticky-toolbar'
import { SubchatBubble } from '../components/subchat-bubble'
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
				<StickyToolbar variant="subchat" className="-mx-a11y-padding mb-xs-2 px-xs-9 py-xs-1">
					<div className="flex h-button-h-sm items-center text-size-sm text-color-text-subtle">
						Sub-chats ({allSubchatsPagination.count})
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
						<SubchatBubble count={subchat.size} className="mr-xs-2" />
						<span className="truncate pb-xs-0 text-color-secondary-text-default">{subchat.text}</span>
					</Button>
				))}
				{allSubchats.length < allSubchatsPagination.count && (
					<LoadingText
						text="Loading subchats..."
						className="min-h-sm-4 pl-sm-0 text-size-sm"
						style={{ visibility: allSubchatsLoading === 'more' ? 'visible' : 'hidden' }}
					/>
				)}
			</div>
		</div>
	)
}
