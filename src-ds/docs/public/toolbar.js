const waitHtmlUpdate = (callback) => {
	wait(50).then(() => callback())
	wait(300).then(() => callback())
	wait(600).then(() => callback())
	wait(1000).then(() => callback())
}

// Storybook offers no CSS selector for selected global option
const toggleSelected = (selector, active) => {
	const item = document.querySelector(selector)
	if (item) {
		active ? item.classList.add('JS_SELECTED') : item.classList.remove('JS_SELECTED')
	}
}

const fixPopups = () => {
	const selectors = [
		`button[title="${window.__TOOLTIPS__.uiLibrary}"]`,
		`button[title="${window.__TOOLTIPS__.colorTheme}"]`,
	]
	const buttons = document.querySelectorAll(selectors.join(', '))

	buttons.forEach((button) => {
		button.classList.add('JS_TRIGGER')
		button.addEventListener('click', () => {
			// Wait for popup to be created
			waitHtmlUpdate(() => toggleSelected('#list-item-' + window.__GLOBALS__.uiLibrary, true))
			waitHtmlUpdate(() => toggleSelected('#list-item-' + window.__GLOBALS__.colorTheme, true))
		})
	})
}

const fixA11yPopup = () => {
	const selector = 'button[title="Vision simulator"]'
	let selectedId

	const button = document.querySelector(selector)
	if (!button) return

	button.classList.add('JS_TRIGGER')
	button.addEventListener('click', () => {
		// Wait for popup to be created
		wait(100).then(() => {
			const items = document.querySelectorAll('[data-testid="tooltip"] button:not(#list-item-reset)')
			items.forEach((item) => {
				// Fix element ids
				item.id = item.id.replace(/\s/g, '_')

				item.addEventListener('click', function () {
					selectedId = this.id
				})
			})

			const resetItem = document.querySelector('[data-testid="tooltip"] button#list-item-reset')
			resetItem && resetItem.addEventListener('click', () => (selectedId = null))

			// Must be done after fixing ids
			selectedId && toggleSelected('#' + selectedId, true)
			waitHtmlUpdate(() => toggleSelected(selector, Boolean(selectedId)))
		})
	})
}

const fixToggles = () => {
	const selectors = ['button[title="Enable measure"]', 'button[title="Apply outlines to the preview"]']
	const buttons = document.querySelectorAll(selectors.join(', '))

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			waitHtmlUpdate(() => {
				toggleSelected(selectors[0], window.__GLOBALS__.measureEnabled)
				toggleSelected(selectors[1], window.__GLOBALS__.outline)
			})
		})
	})

	toggleSelected(selectors[0], window.__GLOBALS__.measureEnabled)
	toggleSelected(selectors[1], window.__GLOBALS__.outline)
}

window.addEventListener('load', () => {
	waitHtmlUpdate(() => {
		fixPopups()
		fixA11yPopup()
		fixToggles()
	})
})
