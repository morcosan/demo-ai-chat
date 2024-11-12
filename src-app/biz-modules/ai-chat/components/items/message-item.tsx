import { Agent, Message } from '../../api'
import { SubchatButton } from '../subchat-button'
import { AgentGptItem } from './agent-gpt-item'

interface Props {
	message: Message
	agent?: Agent
	subchatId?: number
	isSubchat?: boolean
}

export const MessageItem = (props: Props) => {
	const { message, agent, subchatId, isSubchat } = props

	const wrapperClass = cx({
		'group relative ml-scrollbar-w flex flex-col items-end': true,
		'px-xs-5 lg:px-md-0': !isSubchat,
		'mb-xs-9': isSubchat && message.role === 'user',
		'mb-sm-2': isSubchat && message.role === 'agent',
		'lg:mb-xs-9': !isSubchat && message.role === 'user',
		'mb-sm-4': !isSubchat && message.role === 'agent',
	})
	const userItemClass = cx(
		isSubchat
			? 'max-w-[80%] bg-color-secondary-bg'
			: 'max-w-[70%] bg-color-primary-card-bg text-color-primary-card-text'
	)
	const subchatClass = cx({
		'flex-center lg:absolute lg:right-0 lg:top-0': true,
		invisible: message.loading,
		'w-md-0': !isSubchat,
	})

	const skeletonClass = 'rounded-sm bg-color-bg-skeleton'

	return (
		<li className={wrapperClass}>
			{message.role === 'user' ? (
				<div className={cx('relative w-fit rounded-md px-xs-6 py-xs-3 shadow-xs', userItemClass)}>
					<div className="whitespace-pre-wrap">{message.text}</div>

					{Boolean(message.loading && message.role === 'user') && (
						<div className="absolute bottom-0 right-0 translate-y-full leading-1">
							<span className="px-xs-1 text-size-xs text-color-text-placeholder">Sending...</span>
						</div>
					)}
				</div>
			) : (
				<div className="w-full py-xs-1">
					<AgentGptItem agent={agent} className="mx-xs-2" compact subtle />

					<div
						className={cx(
							'mt-xs-3 rounded-md bg-color-bg-card px-xs-6 py-xs-3 shadow-xs',
							message.loading ? 'w-full' : 'w-fit'
						)}
					>
						{message.loading ? (
							<div className="flex animate-pulse flex-col gap-xs-2">
								<div className={skeletonClass}>&nbsp;</div>
								<div className={skeletonClass}>&nbsp;</div>
								<div className={skeletonClass}>&nbsp;</div>
								<div className={cx(skeletonClass, 'w-[60%]')}>&nbsp;</div>
							</div>
						) : (
							message.text
						)}
					</div>
				</div>
			)}

			{/* SUBCHAT BUTTON */}
			{!isSubchat && (
				<div className={subchatClass}>
					<SubchatButton message={message} subchatId={subchatId} />
				</div>
			)}
		</li>
	)
}
