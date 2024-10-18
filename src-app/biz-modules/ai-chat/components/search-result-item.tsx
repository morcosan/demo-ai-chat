import { useSettings } from '@app/biz-modules/user-settings/state'
import { AiChatSvg, Button, SplitSvg } from '@ds/release'
import { useI18n } from '@i18n/release'
import { DateFormat, formatDate } from '@utils/release'
import { SearchResult } from '../state'
import { HighlightedText } from './highlighted-text'

interface Props {
	result: SearchResult
	keyword: string
	onClick(): void
}

export const SearchResultItem = ({ result, keyword, onClick }: Props) => {
	const { activeLocale } = useI18n()
	const { avatar, name } = useSettings()

	const chatId = result.message ? result.message.chatId : result.chat?.id
	const isSubchat = result.message && result.message.parentId !== result.message.chatId
	const subchatId = isSubchat ? result.message?.parentId : 0
	const title = isSubchat ? result.subchat?.text : result.chat?.title
	const size = isSubchat ? result.subchat?.size : result.chat?.size
	const role = result.message?.role
	const text = result.message?.text || ''
	const createdAt = result.message ? result.message.createdAt : result.chat?.createdAt || ''
	const linkHref = isSubchat ? `/chat/${chatId}?subchat=${subchatId}` : `/chat/${chatId}`

	return (
		<li className="flex flex-col">
			<Button
				linkHref={linkHref}
				variant="item-text-default"
				tooltip={t('aiChat.action.openChat')}
				onClick={onClick}
			>
				<span className="flex w-full items-center gap-xs-2">
					{/* SUBCHAT ICON */}
					{Boolean(isSubchat) && <SplitSvg className="h-xs-9 min-w-xs-9 text-color-secondary-text-default" />}

					{/* CHAT TITLE */}
					<span className="flex-1 truncate">{title}</span>

					{/* MESSAGE COUNT */}
					<span className="ml-xs-3 hidden text-size-xs text-color-text-subtle sm:block">
						{t('aiChat.xMessages', { count: size })}
					</span>
				</span>
			</Button>

			{/* MESSAGE COUNT - MOBILE */}
			<div className="mb-xs-2 px-button-px-item text-size-xs text-color-text-subtle sm:hidden">
				{t('aiChat.xMessages', { count: size })}
			</div>

			{/* AGENT + DATE */}
			<div className="mt-xs-0 flex items-center gap-xs-2 px-button-px-item text-size-xs text-color-text-subtle">
				{/* AGENT */}
				{Boolean(role) && (
					<>
						{role === 'agent' ? (
							<AiChatSvg className="mt-px h-xs-6 w-xs-6 rounded-full" />
						) : (
							<img src={avatar} alt="" className="mt-px h-xs-6 w-xs-6 rounded-full" />
						)}
						<span>{role === 'agent' ? 'Lorem Ipsum GPT' : name} -</span>
					</>
				)}

				{/* DATE */}
				<span>{formatDate(createdAt, DateFormat.DD_MM_YY_TT, activeLocale)}</span>
			</div>

			{/* MESSAGE */}
			{Boolean(text) && (
				<div className="mt-xs-2 px-button-px-item">
					<HighlightedText text={text} keyword={keyword} className="text-size-sm text-color-text-subtle" />
				</div>
			)}
		</li>
	)
}
