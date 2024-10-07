import { AiChatSvg } from '@ds/release'
import { Link } from 'react-router-dom'

interface Props extends ReactProps {
	small?: boolean
}

export const AppLogo = ({ small, className = '' }: Props) => {
	return (
		<Link to="/" className={`flex w-fit p-xs-3 ${className}`}>
			{small ? (
				<span className="flex items-center">
					<AiChatSvg className="mr-xs-3 h-sm-0 w-sm-0 animate-pulse" />
					<span className="font-weight-md">AI Chat</span>
				</span>
			) : (
				<>
					<AiChatSvg className="-mr-xs-1 h-sm-5 w-sm-5 animate-pulse" />
					<span className="font-weight-md leading-1">AI Chat</span>
				</>
			)}
		</Link>
	)
}
