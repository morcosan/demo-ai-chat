export const DocsPlayground = ({ children }: ReactProps) => {
	const focusClass = [
		'absolute right-0 py-xs-0 w-md-3 bg-color-bg-default focus:bg-color-hover-2',
		'text-color-text-subtle text-size-xs text-center',
	].join(' ')

	return (
		<div className="flex-center docs-grid-bg relative h-xl-0 flex-col rounded-md border border-color-border-default">
			<label htmlFor="kf-1" className="sr-only">
				Keyboard focus
			</label>
			<input id="kf-1" defaultValue="Keyboard focus" className={`${focusClass} top-[-23px]`} />

			{children}

			<label htmlFor="kf-2" className="sr-only">
				Keyboard focus
			</label>
			<input id="kf-2" defaultValue="Keyboard focus" className={`${focusClass} bottom-[-23px]`} />
		</div>
	)
}
