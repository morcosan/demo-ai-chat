const waitViewLoad = (callback) => {
	wait(100).then(callback)
	wait(200).then(callback)
	wait(400).then(callback)
	wait(700).then(callback)
	wait(1000).then(callback)
	wait(1500).then(callback)
	wait(2000).then(callback)
	wait(5000).then(callback)
}

const fixTableHeaders = (nr) => {
	const elems = document.querySelectorAll('#storybook-panel-root table.docblock-argstable tr[title]')
	elems.forEach((elem) => {
		if (elem.children.length === 2) {
			elem.removeChild(elem.lastElementChild)
			elem.firstElementChild.setAttribute('colspan', '2')
		}
	})
}

const onUrlChange = () => waitViewLoad(fixTableHeaders)

const initialPushState = history.pushState
history.pushState = function (...args) {
	initialPushState.apply(this, args)
	onUrlChange()
}
window.addEventListener('popstate', onUrlChange) // Handles back/forward
onUrlChange()
