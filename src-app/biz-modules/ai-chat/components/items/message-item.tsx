import { CopyButton, Markdown } from '@app/library/release'
import { Button, ReloadSvg, useUiViewport, WarningSvg } from '@ds/release'
import { useMemo, useState } from 'react'
import { Agent, Message } from '../../api'
import { SubchatButton } from '../subchat-button'
import { AgentGptItem } from './agent-gpt-item'

interface Props {
	message: Message
	agent?: Agent
	subchatId?: number
	isSubchat?: boolean
	onRetry?(): void
}

export const MessageItem = (props: Props) => {
	const { message, agent, subchatId, isSubchat, onRetry } = props
	const { isViewportMinLG } = useUiViewport()
	const [isClicked, setIsClicked] = useState(false)

	const isUser = message.role === 'user'
	const showsToolbar = isClicked || message.id === subchatId

	const itemClass = cx(
		'group relative ml-scrollbar-w flex flex-col',
		isViewportMinLG ? (isUser ? 'mb-xs-0' : 'mb-xs-6') : 'mb-xs-6',
		!isSubchat && (isViewportMinLG ? 'px-md-0' : 'px-xs-5')
	)

	const baseCardClass = cx('relative w-fit max-w-full rounded-xl px-xs-9 py-xs-8 shadow-xs')
	const userCardClass = cx(
		'ml-auto',
		isViewportMinLG ? (isSubchat ? '!max-w-[80%]' : '!max-w-[70%]') : '!max-w-[90%]',
		isSubchat
			? 'bg-color-secondary-card-bg text-color-secondary-card-text'
			: 'bg-color-primary-card-bg text-color-primary-card-text'
	)

	const toolbarClass = cx(
		'flex flex-wrap gap-xs-0',
		'mx-px mt-xs-1 min-h-button-h-xs w-fit',
		isUser && 'ml-auto',
		isViewportMinLG && 'opacity-0 group-hover:opacity-100',
		!isViewportMinLG && !showsToolbar && 'pointer-events-none opacity-0',
		'focus-within:opacity-100',
		message.loading && 'invisible'
	)

	const subchatWrapperClass = cx(
		'flex-center',
		isViewportMinLG && 'absolute right-0 top-0 w-md-0',
		message.loading && 'invisible'
	)
	const subchatButtonClass = cx(
		isViewportMinLG && 'px-xs-3',
		isViewportMinLG && message.role === 'agent' && 'mt-sm-1',
		!message.subchatSize && isViewportMinLG && 'opacity-0 focus:opacity-100 group-hover:opacity-100',
		message.id === subchatId && '!opacity-100'
	)

	const cssUserMarkdown: CSS = {
		'.ds-markdown .ds-markdown-img-box img + div': {
			color: isSubchat ? 'var(--ds-color-secondary-card-subtext)' : 'var(--ds-color-primary-card-subtext)',
		},
	}

	const onClickItem = () => setIsClicked((value: boolean) => !value)

	const onClickToolbar = (event: ReactMouseEvent) => event.stopPropagation()

	const slotMarkdown = useMemo(() => <Markdown text={message.text} />, [message.text])

	const slotSubchat = useMemo(() => {
		if (isSubchat || message.failed) return null
		return (
			<div className={subchatWrapperClass}>
				<SubchatButton
					message={message}
					selected={message.id === subchatId}
					small={!isViewportMinLG}
					className={subchatButtonClass}
				/>
			</div>
		)
	}, [isViewportMinLG, message, subchatId, isSubchat])

	return (
		<li className={itemClass} onClick={onClickItem}>
			{isUser ? (
				<div className={cx(baseCardClass, userCardClass)} css={cssUserMarkdown}>
					{slotMarkdown}

					<div
						className={cx(
							'absolute bottom-0 right-0 translate-y-full',
							'whitespace-nowrap px-xs-2 pt-xs-0 text-size-xs leading-1',
							message.loading && 'text-color-text-placeholder',
							message.failed && 'text-color-danger-page-text'
						)}
					>
						{message.loading ? (
							t('core.state.sending')
						) : message.failed ? (
							<div className="flex items-center">
								<WarningSvg className="mr-xs-2 h-xs-4 w-xs-4" />
								{t('core.error.unsent')}
							</div>
						) : (
							''
						)}
					</div>
				</div>
			) : (
				<div>
					<AgentGptItem agent={agent} className="mx-xs-2 mb-xs-4" compact subtle />

					{message.loading ? (
						<div className="w-fit animate-pulse rounded-md bg-color-bg-skeleton px-button-px-item py-xs-2 text-size-sm">
							{t('aiChat.state.thinking')}
						</div>
					) : message.failed ? (
						<>
							<div className={cx(baseCardClass, 'bg-color-danger-card-bg text-color-danger-card-text')}>
								{t('aiChat.error.failedMessage')}
							</div>
							<Button variant="text-default" size="sm" className="mt-xs-1 block" onClick={onRetry}>
								<ReloadSvg className="mr-xs-2 w-xs-6" />
								{t('core.action.retry')}
							</Button>
						</>
					) : (
						<div className={cx(baseCardClass, 'bg-color-bg-card')}>{slotMarkdown}</div>
					)}
				</div>
			)}

			{/* SUBCHAT BUTTON */}
			{Boolean(isViewportMinLG) && slotSubchat}

			{/* TOOLBAR */}
			<div className={toolbarClass} onClick={onClickToolbar}>
				<CopyButton variant="text-subtle" tooltip={t('aiChat.action.copyMessage')} text={message.text} />

				{/* SUBCHAT BUTTON */}
				{!isViewportMinLG && slotSubchat}
			</div>
		</li>
	)
}
