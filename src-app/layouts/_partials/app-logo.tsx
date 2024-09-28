import { AiChatSvg } from '@ds/release'
import { Link } from 'react-router-dom'

export const AppLogo = () => {
	return (
		<Link to="/" className="mb-xs-9 flex w-fit p-xs-3">
			<AiChatSvg className="-mr-xs-1 h-sm-5 w-sm-5 animate-pulse" />
			<span className="font-weight-md leading-1">AI Chat</span>
		</Link>
	)
}
