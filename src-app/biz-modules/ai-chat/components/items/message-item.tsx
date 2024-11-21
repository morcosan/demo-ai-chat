import { Markdown } from '@app/library/release'
import { Button, CopySvg, ReloadSvg, WarningSvg } from '@ds/release'
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

	const wrapperClass = cx(
		'group relative ml-scrollbar-w flex flex-col',
		'mb-sm-0',
		message.role === 'user' ? 'lg:mb-xs-0' : 'lg:mb-xs-6',
		!isSubchat && 'px-xs-5 lg:px-md-0'
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
		'focus-within:opacity-100 lg:opacity-0 lg:group-hover:opacity-100'
	)

	const subchatWrapperClass = cx({
		'flex-center lg:absolute lg:right-0 lg:top-0': true,
		invisible: message.loading,
		'w-md-0': !isSubchat,
	})
	const subchatButtonClass = cx({
		'px-xs-3': true,
		'lg:mt-sm-1': message.role === 'agent',
		'focus:opacity-100 lg:opacity-0 lg:group-hover:opacity-100': !message.subchatSize,
		'!opacity-100': message.id === subchatId,
	})

	const onClickCopy = () => {
		navigator.clipboard.writeText(message.text)
	}

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
			{!isSubchat && !message.failed && (
				<div className={subchatWrapperClass}>
					<SubchatButton message={message} subchatId={subchatId} className={subchatButtonClass} />
				</div>
			)}

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
			</div>
		</li>
	)
}
