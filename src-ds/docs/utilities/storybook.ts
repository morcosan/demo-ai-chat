export const toggleControls = (visible: boolean) => {
	if (window.parent === window) return

	const document = window.parent.document
	const buttonHide = document.querySelector('[title*="Hide addons"]') as HTMLElement | null
	const buttonShow = document.querySelector('[title*="Show addons"]') as HTMLElement | null
	const isVisible = !buttonShow
	const toggleFn = () => buttonHide?.click() // Button "hide" is always in DOM, even when hidden

	if ((visible && !isVisible) || (!visible && isVisible)) {
		toggleFn()
	}
}
