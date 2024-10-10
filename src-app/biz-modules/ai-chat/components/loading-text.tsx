interface Props extends ReactProps {
	text: string
	collapsed?: boolean
}

export const LoadingText = ({ text, collapsed, className, style }: Props) => {
	return (
		<div className={`flex items-center text-color-text-subtle ${className}`} style={style}>
			<span className="mr-xs-4 animate-spin">⌛</span>
			<span className={collapsed ? 'hidden' : ''}>{text}</span>
		</div>
	)
}
