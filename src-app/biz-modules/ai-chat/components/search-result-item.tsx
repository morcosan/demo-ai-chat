import { Button } from '@ds/release'
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
		'rounded-md px-xs-3 py-xs-2 text-size-sm': true,
		'bg-color-secondary-bg': isSubchat && result.role === 'user',
		'bg-color-primary-bg': !isSubchat && result.role === 'user',
		'bg-color-bg-preview': result.role === 'agent',
	})

	return (
		<li className="flex flex-col">
			<Button
				linkHref={`/chat/${result.chatId}`}
				variant="item-text-default"
				tooltip={t('aiChat.action.openChat')}
				onClick={onClick}
			>
				<span className="truncate">{result.chat.title}</span>
			</Button>

			<div className="px-button-px-item">
				<div className="mb-xs-3 text-size-xs text-color-text-subtle">
					{t('aiChat.xMessages', { count: result.chat.size })}
				</div>

				<div className={messageClass}>
					<HighlightedText text={result.text} keyword={keyword} />
				</div>
			</div>
		</li>
	)
}
