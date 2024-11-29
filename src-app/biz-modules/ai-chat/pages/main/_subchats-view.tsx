import { LoadingText } from '@app/library/release'
import { Button } from '@ds/release'
import { debounce } from 'lodash'
import { UIEvent, useMemo } from 'react'
import { Subchat } from '../../api'
import { SubchatIcon } from '../../components/subchat-icon'
import { SubchatToolbar } from '../../components/subchat-toolbar'
import { useAiChat } from '../../state'
import { getTextFromMarkdown } from '../../utils/markdown'

export const SubchatsView = () => {
	const { allSubchats, allSubchatsLoading, allSubchatsPagination, loadMoreSubchats } = useAiChat()

	const onScroll = debounce((event: UIEvent) => {
		const container = event.target as HTMLElement
		const isScrollEnd = container.offsetHeight + container.scrollTop >= container.scrollHeight
		isScrollEnd && loadMoreSubchats()
	}, 300)

	const slotSubchats = useMemo(
		() => (
			<ul className="pt-a11y-padding">
				{allSubchats.map((subchat: Subchat) => (
					<li key={subchat.id}>
						<Button
							linkHref={`/chat/${subchat.chatId}?subchat=${subchat.id}`}
							variant="item-text-default"
							size="md"
							className="block"
						>
							<SubchatIcon count={subchat.size} className="mr-xs-4 min-w-sm-3" />
							<span className="line-clamp-1 text-size-sm">{getTextFromMarkdown(subchat.text)}</span>
						</Button>
					</li>
				))}
			</ul>
		),
		[allSubchats]
	)

	return (
		<div className="h-full">
			<div className="ds-scrollable h-full overflow-y-scroll pb-xs-9" onScroll={onScroll}>
				{/* TOOLBAR */}
				<SubchatToolbar>
					<span className="pl-xs-6">
						{t('aiChat.label.subchats')} ({allSubchatsPagination.count})
					</span>
				</SubchatToolbar>

				{slotSubchats}

				{allSubchats.length < allSubchatsPagination.count && (
					<LoadingText
						text={t('aiChat.state.loadingSubchats')}
						className="min-h-sm-4 pl-sm-0 text-size-sm"
						style={{ visibility: allSubchatsLoading === 'more' ? 'visible' : 'hidden' }}
					/>
				)}
			</div>
		</div>
	)
}
