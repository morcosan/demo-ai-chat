import { AiChatSvg, Button } from '@ds/release'
import { Message } from '../api/types'
import { SubchatIcon } from './subchat-icon'

interface Props {
	message: Message
	subchatId?: number
	isSubchat?: boolean
	onClickSubchat?: () => void
}

export const MessageItem = ({ message, subchatId, isSubchat, onClickSubchat }: Props) => {
	const wrapperClass = cx({
		'group relative flex flex-col items-end': true,
		'px-xs-5 lg:px-md-0': !isSubchat,
		'mb-xs-9': isSubchat && message.role === 'user',
		'mb-sm-2': isSubchat && message.role === 'agent',
		'lg:mb-xs-9': !isSubchat && message.role === 'user',
		'mb-sm-4': !isSubchat && message.role === 'agent',
	})
	const userItemClass = isSubchat ? 'max-w-[80%] bg-color-secondary-bg' : 'max-w-[70%] bg-color-primary-bg'
	const subchatClass = cx({
		'flex-center lg:absolute lg:right-0 lg:top-0': true,
		invisible: message.loading,
		'w-md-0': !isSubchat,
	})
	const subchatButtonClass = cx({
		'px-xs-3': true,
		'lg:mt-sm-2': message.role === 'agent',
		'focus:opacity-100 lg:opacity-0 lg:group-hover:opacity-100': !message.subchatSize,
		'!opacity-100': message.id === subchatId,
	})

	return (
		<div className={wrapperClass}>
			{message.role === 'user' ? (
				<div className={cx('relative w-fit rounded-md px-xs-6 py-xs-3 shadow-sm', userItemClass)}>
					<div className="whitespace-pre-wrap">{message.text}</div>

					{Boolean(message.loading && message.role === 'user') && (
						<div className="absolute bottom-0 right-0 translate-y-full leading-1">
							<span className="px-xs-1 text-size-xs text-color-text-placeholder">Sending...</span>
						</div>
					)}
				</div>
			) : (
				<div className="w-full px-xs-5 py-xs-1">
					<div className={cx('flex items-center gap-xs-1', isSubchat ? 'mb-xs-2' : 'mb-xs-4')}>
						<div className="flex-center h-sm-0 w-sm-0 rounded-full">
							<AiChatSvg className="h-xs-8" />
						</div>
						<span className="mb-xs-0 text-size-sm text-color-text-subtle">Lorem Ipsum GPT</span>
					</div>

					{message.loading ? (
						<div className="flex animate-pulse flex-col gap-xs-2">
							<div className="h-[var(--ds-line-height-md)] rounded-sm bg-color-text-placeholder" />
							<div className="h-[var(--ds-line-height-md)] rounded-sm bg-color-text-placeholder" />
							<div className="h-[var(--ds-line-height-md)] rounded-sm bg-color-text-placeholder" />
							<div className="h-[var(--ds-line-height-md)] w-2/3 rounded-sm bg-color-text-placeholder" />
						</div>
					) : (
						message.text
					)}
				</div>
			)}

			{/* SUBCHAT BUTTON */}
			{!isSubchat && (
				<div className={subchatClass}>
					<Button
						tooltip={message.subchatSize ? `Open subchat (${message.subchatSize} messages)` : 'Create subchat'}
						linkHref={`/chat/${message.chatId}?subchat=${message.id}`}
						variant="item-text-default"
						highlight={message.id === subchatId ? 'pressed' : 'default'}
						className={subchatButtonClass}
						onClick={onClickSubchat}
					>
						<SubchatIcon count={message.subchatSize || -1} />
					</Button>
				</div>
			)}
		</div>
	)
}
