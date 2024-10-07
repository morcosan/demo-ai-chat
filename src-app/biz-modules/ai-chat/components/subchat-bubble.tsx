import { ChatSvg, PlusSvg } from '@ds/release'

interface Props extends ReactProps {
	count: number
}

export const SubchatBubble = ({ count, className = '' }: Props) => {
	return (
		<span className={`relative ${className}`}>
			<ChatSvg className="h-sm-1 fill-color-secondary-bg" />
			{count ? (
				<span className="absolute-center pb-xs-0 text-size-xs text-color-secondary-text-default">{count}</span>
			) : (
				<PlusSvg className="absolute-center h-xs-5 fill-color-secondary-text-default" />
			)}
		</span>
	)
}
