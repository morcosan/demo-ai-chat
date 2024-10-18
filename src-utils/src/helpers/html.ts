export const TAB_INDEX_SELECTOR = ['[tabindex]', 'button', 'input', 'select', 'textarea']
	.map((selector: string) => `${selector}:not(:disabled):not([disabled])`)
	.join(', ')

export const queryElementsWithTabIndex = (root: HTMLElement): HTMLElement[] => {
	return Array.from(root.querySelectorAll<HTMLElement>(TAB_INDEX_SELECTOR))
		.filter(isElementVisible)
		.filter((elem: HTMLElement) => elem.tabIndex > -1)
}

export const isElementVisible = (elem: HTMLElement) => {
	if (elem.style.display === 'none') return false
	if (elem.style.visibility === 'hidden') return false

	const rect = elem.getBoundingClientRect()

	return rect && rect.height > 0 && rect.width > 0
}
