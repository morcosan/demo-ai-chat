import { AiChatSvg, Button } from '@ds/release'
import { Message } from '../api/types'
import { AiChatView } from '../state'
import { SubchatIcon } from './subchat-icon'

interface Props {
	message: Message
	secondary?: boolean
	subchatId?: number
	activeView?: AiChatView
}

export const MessageItem = ({ message, secondary, subchatId, activeView }: Props) => {
	const wrapperClass = [
		secondary ? '' : 'px-md-0',
		message.role === 'user' ? 'mb-xs-9' : secondary ? 'mb-sm-2' : 'mb-sm-4',
	].join(' ')
	const userItemClass = secondary ? 'max-w-[80%] bg-color-secondary-bg' : 'max-w-[70%] bg-color-primary-bg'
	const subchatClass = [
		'px-xs-3',
		message.role === 'user' ? '' : 'mt-sm-2',
		message.subchatSize ? '' : 'opacity-0 group-hover:opacity-100 focus:opacity-100',
		message.id === subchatId ? '!opacity-100' : '',
	].join(' ')

	return (
		<div className={`group relative flex flex-col items-end ${wrapperClass}`}>
			{message.role === 'user' ? (
				<div className={`relative w-fit rounded-md px-xs-6 py-xs-3 shadow-sm ${userItemClass}`}>
					<div className="whitespace-pre-wrap">{message.text}</div>

					{Boolean(message.loading && message.role === 'user') && (
						<div className="absolute bottom-0 right-0 translate-y-full leading-1">
							<span className="px-xs-1 text-size-xs text-color-text-placeholder">Sending...</span>
						</div>
					)}
				</div>
			) : (
				<div className="w-full px-xs-5 py-xs-1">
					<div className={`${secondary ? 'mb-xs-2' : 'mb-xs-4'} flex items-center gap-xs-1`}>
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
			{!secondary && !message.loading && (
				<div className={`flex-center absolute right-0 top-0 ${secondary ? '' : 'w-md-0'}`}>
					<Button
						tooltip={message.subchatSize ? `Open subchat (${message.subchatSize} messages)` : 'Create subchat'}
						linkHref={`/chat/${message.chatId}?subchat=${message.id}`}
						variant="item-text-default"
						highlight={message.id === subchatId && activeView === AiChatView.DESKTOP ? 'pressed' : 'default'}
						className={subchatClass}
					>
						<SubchatIcon count={message.subchatSize || -1} />
					</Button>
				</div>
			)}
		</div>
	)
}
