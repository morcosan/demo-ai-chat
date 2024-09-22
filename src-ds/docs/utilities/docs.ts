export const renderHtml = (html: string): string => {
	return html
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/^\n/, '')
		.replace(/\n/g, '<br>')
		.replace(/\^(.*?)\^/g, '<code>$1</code>')
}
