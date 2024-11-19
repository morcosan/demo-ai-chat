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

// https://stackoverflow.com/questions/4565112/how-to-find-out-if-the-user-browser-is-chrome
export const isChromeBrowser = () => {
	const windowAny = window as any
	const isChromium = windowAny.chrome
	const winNav = windowAny.navigator
	const vendorName = winNav.vendor
	const isOpera = typeof windowAny.opr !== 'undefined'
	const isFirefox = winNav.userAgent.indexOf('Firefox') > -1
	const isIEEdge = winNav.userAgent.indexOf('Edg') > -1
	const isIOSChrome = winNav.userAgent.match('CriOS')
	const isGoogleChrome =
		typeof winNav.userAgentData !== 'undefined'
			? winNav.userAgentData.brands[0].brand === 'Google Chrome'
			: vendorName === 'Google Inc.'

	return (
		isIOSChrome ||
		(isChromium !== null &&
			typeof isChromium !== 'undefined' &&
			vendorName === 'Google Inc.' &&
			!isOpera &&
			!isIEEdge &&
			!isFirefox &&
			isGoogleChrome)
	)
}
