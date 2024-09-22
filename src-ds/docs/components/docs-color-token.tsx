interface Props {
	value: string
}

export const DocsColorToken = ({ value }: Props) => {
	return (
		<div className="flex items-center gap-xs-3">
			<div className="docs-grid-bg h-sm-1 w-sm-1 overflow-hidden border border-color-border-default !bg-[length:33%_33%]">
				<div className="h-full w-full" style={{ background: value }} />
			</div>
			<code>{value}</code>
		</div>
	)
}
