import { useUserAccount } from '@app/biz-modules/user-settings/state'
import { Button, SplitSvg } from '@ds/release'
import { useI18n } from '@i18n/release'
import { DateFormat, formatDate } from '@utils/release'
import { useMemo } from 'react'
import { Agent } from '../../api'
import { SearchResult } from '../../state'
import { getTextFromMarkdown } from '../../utils/markdown'
import { HighlightedText } from '../highlighted-text'
import { AgentGptItem } from './agent-gpt-item'

interface Props {
	result: SearchResult
	keyword: string
	agent?: Agent
	onClick(): void
}

export const SearchResultItem = (props: Props) => {
	const { result, keyword, agent, onClick } = props
	const { activeLocale } = useI18n()
	const { account } = useUserAccount()

	const chatId = result.message ? result.message.chatId : result.chat?.id
	const isSubchat = result.message && result.message.parentId !== result.message.chatId
	const subchatId = isSubchat ? result.message?.parentId : 0
	const size = isSubchat ? result.subchat?.size : result.chat?.size || 0
	const role = result.message?.role
	const createdAt = result.message ? result.message.createdAt : result.chat?.createdAt || ''
	const linkHref = isSubchat ? `/chat/${chatId}?subchat=${subchatId}` : `/chat/${chatId}`
	const lowerKeyword = keyword.toLowerCase()

	const messageText = useMemo(() => {
		const lines = result.message?.text.split('\n') || []
		const maxLines = 5
		const maxChars = 200

		const index = lines.findIndex((line) => line.toLowerCase().includes(lowerKeyword))
		if (index < 0) return ''

		let markdown = lines[index]
		let indexDiff = 0

		while (indexDiff * 2 + 1 < maxLines && markdown.length < maxChars) {
			indexDiff++
			if (lines[index + indexDiff]) markdown = markdown + '\n' + lines[index + indexDiff]
			if (lines[index - indexDiff]) markdown = lines[index - indexDiff] + '\n' + markdown
		}

		return getTextFromMarkdown(markdown)
	}, [result.message?.text])

	const chatTitle = useMemo(() => {
		return (isSubchat ? getTextFromMarkdown(result.subchat?.text || '') : result.chat?.title) || ''
	}, [isSubchat, result.subchat?.text, result.chat?.title])

	return (
		<li className={cx('flex flex-col break-words last:mb-0', result.message ? 'mb-sm-7' : 'mb-sm-4')}>
			<Button
				linkHref={linkHref}
				variant="item-text-default"
				tooltip={t('aiChat.action.openChat')}
				onClick={onClick}
			>
				<span className="flex w-full items-center gap-xs-2">
					{/* SUBCHAT ICON */}
					{Boolean(isSubchat) && <SplitSvg className="h-xs-9 min-w-xs-9 text-color-secondary-page-text" />}

					{/* CHAT TITLE */}
					<HighlightedText text={chatTitle} keyword={keyword} className="flex-1 truncate" />

					{/* MESSAGE COUNT */}
					<span className="ml-xs-3 hidden text-size-xs text-color-text-subtle sm:block">
						{t('aiChat.label.xMessages', { count: size })}
					</span>
				</span>
			</Button>

			{/* MESSAGE COUNT - MOBILE */}
			<div className="mb-xs-2 px-button-px-item text-size-xs text-color-text-subtle sm:hidden">
				{t('aiChat.label.xMessages', { count: size })}
			</div>

			{/* AGENT + DATE */}
			<div className="flex items-center px-button-px-item text-size-xs text-color-text-subtle">
				{/* AGENT */}
				{Boolean(role) &&
					(role === 'agent' ? (
						<AgentGptItem agent={agent} compact subtle />
					) : (
						<>
							<img src={account.avatar} alt="" className="mr-xs-2 h-xs-6 w-xs-6 rounded-full" />
							<span>{account.name}</span>
						</>
					))}

				{/* DATE */}
				<span className="mx-xs-3">-</span>
				<span>{formatDate(createdAt, DateFormat.DD_MM_YY_TT, activeLocale)}</span>
			</div>

			{/* MESSAGE */}
			{Boolean(messageText) && (
				<HighlightedText
					text={messageText}
					keyword={keyword}
					className="mt-xs-2 px-button-px-item text-size-sm text-color-text-subtle"
					multiline
				/>
			)}
		</li>
	)
}
