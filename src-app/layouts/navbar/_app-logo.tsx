import { AiChatSvg } from '@ds/release'
import { Link } from 'react-router-dom'

interface Props extends ReactProps {
	mobile?: boolean
	collapsed?: boolean
}

export const AppLogo = ({ collapsed, mobile, className }: Props) => {
	return (
		<Link to="/" className={cx('flex w-fit p-xs-3 text-color-text-link', className)} reloadDocument>
			{mobile ? (
				<span className="flex items-center">
					<AiChatSvg className="mr-xs-3 h-sm-0 w-sm-0 animate-pulse" />
					<span className="font-weight-md">AI Chat</span>
				</span>
			) : (
				<>
					<AiChatSvg className="-mr-xs-1 h-sm-4 w-sm-4 animate-pulse" />
					<span className={cx('font-weight-md leading-1', collapsed && 'hidden')}>AI Chat</span>
				</>
			)}
		</Link>
	)
}
