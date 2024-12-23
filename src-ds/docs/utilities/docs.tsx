export const HEADER_EVENTS = 'Events'
export const HEADER_METHODS = 'Methods (ref)'
export const HEADER_PROPS = 'Props (config)'
export const HEADER_SLOTS = 'Slots (content)'

export const renderHtml = (html: string): string => {
	return html
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/^\n/, '')
		.replace(/\n/g, '<br>')
		.replace(/\^(.*?)\^/g, '<code>$1</code>')
}

export const getPropIndicator = (required?: boolean) => {
	return required ? (
		<span title="Required" className="cursor-default px-xs-3 font-weight-xl text-color-danger-page-text">
			*
		</span>
	) : (
		<span title="Optional" className="cursor-default px-xs-3 text-size-sm text-color-text-subtle">
			?
		</span>
	)
}
