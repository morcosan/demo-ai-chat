interface Props extends ReactProps {
	text: string
	keyword: string
	multiline?: boolean
}

export const HighlightedText = ({ text, keyword, multiline, className }: Props) => {
	const lowerKeyword = keyword.toLowerCase()
	const regexKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
	const regex = multiline ? new RegExp(`(${regexKeyword}|\n)`, 'gi') : new RegExp(`(${regexKeyword})`, 'gi')
	const parts = text
		.split(regex)
		.filter((v: string) => v)
		.reduce((acc: string[], v: string) => (v === '\n' && acc[acc.length - 1] === '\n' ? acc : [...acc, v]), [])

	return (
		<span className={className}>
			{parts.map((part, j) =>
				part.toLowerCase() === lowerKeyword ? (
					<span key={j} className="bg-color-secondary-button-bg px-px text-color-secondary-button-text">
						{part}
					</span>
				) : part === '\n' ? (
					<br key={j} />
				) : (
					part
				)
			)}
		</span>
	)
}
