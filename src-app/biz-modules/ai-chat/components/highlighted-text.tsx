interface Props extends ReactProps {
	text: string
	keyword: string
}

export const HighlightedText = ({ text, keyword, className }: Props) => {
	const lcKeyword = keyword.toLowerCase()
	const parts = text.split(new RegExp(`(${keyword})`, 'gi'))

	return (
		<span className={className}>
			{parts.map((part, j) =>
				part.toLowerCase() === lcKeyword ? (
					<span key={j} className="bg-color-secondary-button-bg px-px text-color-secondary-button-text">
						{part}
					</span>
				) : (
					part
				)
			)}
		</span>
	)
}
