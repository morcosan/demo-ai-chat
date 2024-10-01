import { ChatSvg } from '@ds/release'

interface Props extends ReactProps {
	count: number
}

export const SubchatBubble = ({ count, className }: Props) => {
	return (
		<span className={`relative ${className}`}>
			<ChatSvg className="h-sm-1 fill-color-secondary-bg" />
			<span className="absolute-center pb-xs-0 text-size-xs text-color-secondary-text-default">{count}</span>
		</span>
	)
}
