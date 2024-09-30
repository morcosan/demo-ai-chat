import { Message } from '../api/types'

interface Props {
	message: Message
}

export const MessageBubble = ({ message }: Props) => {
	return <pre className="px-xs-5 py-xs-1">{message.text}</pre>
}
