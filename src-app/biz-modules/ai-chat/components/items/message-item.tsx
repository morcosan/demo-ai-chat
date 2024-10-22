import { AiChatSvg, useUiTheme } from '@ds/release'
import { Message } from '../../api'
import { SubchatButton } from '../subchat-button'

interface Props {
	message: Message
	subchatId?: number
	isSubchat?: boolean
}

export const MessageItem = ({ message, subchatId, isSubchat }: Props) => {
	const { $lineHeight } = useUiTheme()

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

	const skeletonClass = 'rounded-sm bg-color-text-placeholder'
	const skeletonStyle = { height: `calc(${$lineHeight['md']} * 1em)` }

	return (
		<li className={wrapperClass}>
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
							<div className={skeletonClass} style={skeletonStyle} />
							<div className={skeletonClass} style={skeletonStyle} />
							<div className={skeletonClass} style={skeletonStyle} />
							<div className={skeletonClass} style={{ ...skeletonStyle, width: '60%' }} />
						</div>
					) : (
						message.text
					)}
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
