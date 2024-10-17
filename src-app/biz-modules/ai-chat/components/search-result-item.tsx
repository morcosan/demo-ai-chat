import { Button, SplitSvg } from '@ds/release'
import { SearchResult } from '../api'
import { HighlightedText } from './highlighted-text'

interface Props {
	result: SearchResult
	keyword: string
	onClick(): void
}

export const SearchResultItem = ({ result, keyword, onClick }: Props) => {
	const isSubchat = result.parentId !== result.chatId

	const messageClass = cx({
		'mx-button-px-item mt-xs-1 rounded-sm px-xs-3 py-xs-2 text-size-sm': true,
		'bg-color-secondary-bg text-color-secondary-text-default': result.role === 'user' && isSubchat,
		'bg-color-primary-bg text-color-primary-text-default': result.role === 'user' && !isSubchat,
		'bg-color-bg-preview text-color-text-subtle': result.role === 'agent',
	})

	return (
		<li className="flex flex-col">
			<Button
				linkHref={`/chat/${result.chatId}`}
				variant="item-text-default"
				tooltip={t('aiChat.action.openChat')}
				onClick={onClick}
			>
				<span className="flex w-full items-center gap-xs-1">
					{Boolean(isSubchat) && <SplitSvg className="h-xs-9 min-w-xs-9 text-color-secondary-text-default" />}

					<span className={cx('flex-1 truncate', isSubchat && 'text-color-secondary-text-default')}>
						{result.chat.title}
					</span>

					<span className="ml-xs-3 hidden text-size-xs text-color-text-subtle sm:block">
						{t('aiChat.xMessages', { count: result.chat.size })}
					</span>
				</span>
			</Button>

			<div className="mb-xs-2 px-button-px-item text-size-xs text-color-text-subtle sm:hidden">
				{t('aiChat.xMessages', { count: result.chat.size })}
			</div>

			<div className={messageClass}>
				<HighlightedText text={result.text} keyword={keyword} />
			</div>
		</li>
	)
}
