interface Props {
	value: string
}

export const DocsColorToken = ({ value }: Props) => {
	const bgClass = cx(
		'box-content h-sm-0 w-sm-0 overflow-hidden border border-color-border-default',
		'docs-bg docs-bg-tiles'
	)

	return (
		<div className="flex items-center gap-xs-3">
			<div className={bgClass}>
				<div className="h-full w-full" style={{ background: value }} />
			</div>
			<code>{value}</code>
		</div>
	)
}
