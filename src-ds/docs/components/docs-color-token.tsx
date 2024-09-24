interface Props {
	value: string
}

export const DocsColorToken = ({ value }: Props) => {
	const bgClass = 'h-sm-0 w-sm-0 box-content overflow-hidden border border-color-border-default'

	return (
		<div className="flex items-center gap-xs-3">
			<div className={bgClass + ' docs-bg docs-bg-tiles'}>
				<div className="h-full w-full" style={{ background: value }} />
			</div>
			<code>{value}</code>
		</div>
	)
}
