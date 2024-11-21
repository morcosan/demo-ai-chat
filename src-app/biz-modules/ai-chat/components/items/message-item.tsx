import { Markdown } from '@app/library/release'
import { Button, CopySvg, ReloadSvg, useUiViewport, WarningSvg } from '@ds/release'
import { useMemo } from 'react'
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

	const wrapperClass = cx(
		'group relative ml-scrollbar-w flex flex-col',
		isViewportMinLG ? (message.role === 'user' ? 'mb-xs-0' : 'mb-xs-6') : 'mb-sm-0',
		!isSubchat && (isViewportMinLG ? 'px-md-0' : 'px-xs-5')
	)

	const baseCardClass = cx('relative w-fit max-w-full rounded-md px-xs-7 py-xs-6 shadow-xs')
	const userCardClass = cx(
		'ml-auto',
		isSubchat
			? '!max-w-[80%] bg-color-secondary-card-bg text-color-secondary-card-text'
			: '!max-w-[70%] bg-color-primary-card-bg text-color-primary-card-text'
	)

	const toolbarClass = cx(
		'mx-px mt-xs-1 flex min-h-button-h-xs flex-wrap gap-xs-2',
		isViewportMinLG && 'opacity-0 group-hover:opacity-100',
		'focus-within:opacity-100'
	)

	const subchatWrapperClass = cx(
		'flex-center',
		isViewportMinLG && 'absolute right-0 top-0',
		message.loading && 'invisible',
		!isSubchat && 'w-md-0'
	)
	const subchatButtonClass = cx(
		'px-xs-3',
		isViewportMinLG && message.role === 'agent' && 'mt-sm-1',
		!message.subchatSize && isViewportMinLG && 'opacity-0 focus:opacity-100 group-hover:opacity-100',
		message.id === subchatId && '!opacity-100'
	)

	const onClickCopy = () => {
		navigator.clipboard.writeText(message.text)
	}

	const slotSubchat = useMemo(() => {
		if (isSubchat || message.failed) return null
		return (
			<div className={subchatWrapperClass}>
				<SubchatButton
					message={message}
					size={isViewportMinLG ? 'md' : 'xs'}
					selected={message.id === subchatId}
					className={subchatButtonClass}
				/>
			</div>
		)
	}, [isViewportMinLG, message, subchatId, isSubchat])

	return (
		<li className={wrapperClass}>
			{message.role === 'user' ? (
				<div className={cx(baseCardClass, userCardClass)}>
					<Markdown text={message.text} className="max-w-full" />

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
						<div className={cx(baseCardClass, 'bg-color-bg-card')}>
							<Markdown text={message.text} />
						</div>
					)}
				</div>
			)}

			{/* SUBCHAT BUTTON */}
			{Boolean(isViewportMinLG) && slotSubchat}

			{/* TOOLBAR */}
			<div className={toolbarClass}>
				<Button
					variant="text-subtle"
					size="xs"
					className={cx(message.role === 'user' && 'ml-auto')}
					onClick={onClickCopy}
				>
					<CopySvg className="mr-xs-2 h-xs-4 w-xs-4" />
					{t('core.action.copy')}
				</Button>

				{/* SUBCHAT BUTTON */}
				{!isViewportMinLG && slotSubchat}
			</div>
		</li>
	)
}
