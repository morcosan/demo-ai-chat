import { MarkdownText } from '@app/library/release'
import { Button, ReloadSvg, WarningSvg } from '@ds/release'
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
		'group relative ml-scrollbar-w flex flex-col items-end',
		'mb-sm-0 lg:mb-sm-2',
		!isSubchat && 'px-xs-5 lg:px-md-0'
	)
	const baseCardClass = cx('relative w-fit max-w-full rounded-md px-xs-6 py-xs-3 shadow-xs')
	const userCardClass = cx(
		isSubchat
			? '!max-w-[80%] bg-color-secondary-card-bg text-color-secondary-card-text'
			: '!max-w-[70%] bg-color-primary-card-bg text-color-primary-card-text'
	)
	const subchatClass = cx({
		'flex-center lg:absolute lg:right-0 lg:top-0': true,
		invisible: message.loading,
		'w-md-0': !isSubchat,
	})

	return (
		<li className={wrapperClass}>
			{message.role === 'user' ? (
				<div className={cx(baseCardClass, userCardClass)}>
					<MarkdownText text={message.text} className="max-w-full" />

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
				<div className="w-full py-xs-1">
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
							<MarkdownText text={message.text} />
						</div>
					)}
				</div>
			)}

			{/* SUBCHAT BUTTON */}
			{!isSubchat && !message.failed && (
				<div className={subchatClass}>
					<SubchatButton message={message} subchatId={subchatId} />
				</div>
			)}
		</li>
	)
}
