interface Props extends ReactProps {
	text: string
}

export const LoadingText = ({ text, className, style }: Props) => {
	return (
		<div className={`flex text-color-text-subtle ${className}`} style={style}>
			<span className="mr-xs-4 animate-spin">⌛</span>
			{text}
		</div>
	)
}
