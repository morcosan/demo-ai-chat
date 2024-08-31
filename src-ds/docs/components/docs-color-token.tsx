interface Props {
	token: DesignToken
	theme?: ColorTheme
}

export const DocsColorToken = ({ token, theme }: Props) => {
	const bg = theme ? (token.value as TokenValue)[theme] : token.value
	const text = theme ? (token.value as TokenValue)[theme] : token.value

	return (
		<div className="flex items-center gap-xs-3">
			<div className="docs-grid-bg h-sm-1 w-sm-1 overflow-hidden border border-color-grey-1 !bg-[length:33%_33%]">
				<div className="h-full w-full" style={{ background: String(bg) }} />
			</div>
			<code>{String(text)}</code>
		</div>
	)
}
