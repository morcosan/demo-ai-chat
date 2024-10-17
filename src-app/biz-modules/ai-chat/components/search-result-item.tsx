import { useSettings } from '@app/biz-modules/user-settings/state'
import { AiChatSvg, Button, SplitSvg } from '@ds/release'
import { SearchResult } from '../api'
import { HighlightedText } from './highlighted-text'

interface Props {
	result: SearchResult
	keyword: string
	onClick(): void
}

export const SearchResultItem = ({ result, keyword, onClick }: Props) => {
	const { avatar, name } = useSettings()
	const isSubchat = result.parentId !== result.chatId

	return (
		<li className="flex flex-col">
			<Button
				linkHref={`/chat/${result.chatId}`}
				variant="item-text-default"
				tooltip={t('aiChat.action.openChat')}
				onClick={onClick}
			>
				<span className="flex w-full items-center gap-xs-2">
					{/* SUBCHAT ICON */}
					{Boolean(isSubchat) && <SplitSvg className="h-xs-9 min-w-xs-9 text-color-secondary-text-default" />}

					{/* CHAT TITLE */}
					<span className={cx('flex-1 truncate', isSubchat && 'text-color-secondary-text-default')}>
						{result.chat.title}
					</span>

					{/* MESSAGE COUNT */}
					<span className="ml-xs-3 hidden text-size-xs text-color-text-subtle sm:block">
						{t('aiChat.xMessages', { count: result.chat.size })}
					</span>
				</span>
			</Button>

			{/* MESSAGE COUNT - MOBILE */}
			<div className="mb-xs-2 px-button-px-item text-size-xs text-color-text-subtle sm:hidden">
				{t('aiChat.xMessages', { count: result.chat.size })}
			</div>

			{/* AGENT NAME */}
			<div className="mt-xs-0 flex items-center gap-xs-2 px-button-px-item text-size-xs text-color-text-subtle">
				{result.role === 'agent' ? (
					<AiChatSvg className="h-xs-6 w-xs-6 rounded-full" />
				) : (
					<img src={avatar} alt="" className="h-xs-6 w-xs-6 rounded-full" />
				)}
				<span className="mb-px">{result.role === 'agent' ? 'Lorem Ipsum GPT' : name}</span>
			</div>

			{/* MESSAGE */}
			<div className="mt-xs-1 px-button-px-item">
				<HighlightedText text={result.text} keyword={keyword} className="text-size-sm text-color-text-subtle" />
			</div>
		</li>
	)
}
