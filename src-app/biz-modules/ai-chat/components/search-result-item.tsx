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
	const title = (isSubchat ? result.subchat?.text : result.chat?.title) || ''
	const size = isSubchat ? result.subchat?.size : result.chat?.size || 0
	const role = result.message?.role
	const createdAt = result.message ? result.message.createdAt : result.chat?.createdAt || ''
	const linkHref = isSubchat ? `/chat/${chatId}?subchat=${subchatId}` : `/chat/${chatId}`
	const lcKeyword = keyword.toLowerCase()
	const text = result.message?.text.split('\n').find((line) => line.toLowerCase().includes(lcKeyword)) || ''

	return (
		<li className={cx('flex flex-col last:mb-0', result.message ? 'mb-sm-7' : 'mb-sm-4')}>
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
					<HighlightedText text={title} keyword={keyword} className="flex-1 truncate" />

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
			<div className="flex items-center gap-xs-2 px-button-px-item text-size-xs text-color-text-subtle">
				{/* AGENT */}
				{Boolean(role) && (
					<>
						{role === 'agent' ? (
							<AiChatSvg className="mt-px h-xs-6 w-xs-6 rounded-full" />
						) : (
							<img src={avatar} alt="" className="h-xs-6 w-xs-6 rounded-full" />
						)}
						<span>{role === 'agent' ? 'Lorem Ipsum GPT' : name} -</span>
					</>
				)}

				{/* DATE */}
				<span>{formatDate(createdAt, DateFormat.DD_MM_YY_TT, activeLocale)}</span>
			</div>

			{/* MESSAGE */}
			{Boolean(text) && (
				<HighlightedText
					text={text}
					keyword={keyword}
					className="mt-xs-2 px-button-px-item text-size-sm text-color-text-subtle"
				/>
			)}
		</li>
	)
}
