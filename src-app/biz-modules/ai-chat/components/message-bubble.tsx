import SubchatSvg from '@app/library/assets/icons/subchat.svg'
import { AiChatSvg, IconButton } from '@ds/release'
import { Message } from '../api/types'

interface Props {
	message: Message
	widthClass: string
}

export const MessageBubble = ({ message, widthClass }: Props) => {
	return (
		<div className="relative flex flex-col items-end">
			{message.role === 'user' ? (
				<div className="mb-xs-5 w-fit max-w-[70%] rounded-md bg-color-primary-bg px-xs-6 py-xs-3 shadow-md">
					<div className="whitespace-pre-wrap">{message.text}</div>
				</div>
			) : (
				<div className="mb-sm-4 px-xs-5 py-xs-1">
					<div className="mb-xs-4 flex items-center gap-xs-1">
						<div className="flex-center h-sm-0 w-sm-0 rounded-full">
							<AiChatSvg className="h-xs-8" />
						</div>
						<span className="mb-xs-0 text-size-sm text-color-text-subtle">Lorem Ipsum GPT</span>
					</div>

					{message.text}
				</div>
			)}

			{/* SUBCHAT BUTTON */}
			{message.subchatSize > 0 && (
				<div className={`flex-center absolute right-0 top-0 translate-x-full ${widthClass}`}>
					<IconButton
						tooltip="Open subchat"
						size="lg"
						className={message.role === 'user' ? '-mt-xs-1' : 'mt-sm-1'}
					>
						<span className="relative">
							<SubchatSvg className="h-sm-1 fill-color-text-placeholder" />
							<span className="absolute-center pb-xs-0 text-size-xs font-weight-md text-color-text-subtle">
								{message.subchatSize}
							</span>
						</span>
					</IconButton>
				</div>
			)}
		</div>
	)
}
