export const DocsPlayground = ({ children }: ReactProps) => {
	const focusClass = [
		'absolute right-0 py-xs-0 w-md-3 bg-color-bg-default focus:bg-color-hover-2',
		'text-color-grey-4 text-size-xs text-center',
	].join(' ')

	return (
		<div className="flex-center docs-grid-bg relative h-xl-0 flex-col rounded-md border border-color-border">
			<input defaultValue="Keyboard focus" className={`${focusClass} top-[-23px]`} />
			{children}
			<input defaultValue="Keyboard focus" className={`${focusClass} bottom-[-23px]`} />
		</div>
	)
}
