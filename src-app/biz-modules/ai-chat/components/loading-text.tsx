interface Props extends ReactProps {
	text: string
}

export const LoadingText = ({ text, className }: Props) => {
	return (
		<div className={`flex text-color-text-subtle ${className}`}>
			<span className="mr-xs-4 animate-spin">⌛</span>
			{text}
		</div>
	)
}
