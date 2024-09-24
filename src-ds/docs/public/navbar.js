const fixHeader = () => {
	const linkElem = document.querySelector('.sidebar-header a:not([href="#storybook-preview-wrapper"])')
	linkElem.href = location.origin + location.pathname
	linkElem.className = '!flex flex-wrap !flex-none w-fit p-xs-5 rounded-md'
	linkElem.innerHTML = `
		<img src="./favicon.svg" alt="" class="-mr-xs-2 h-sm-5 w-sm-5 animate-pulse">
		<span class="leading-1 font-weight-md text-color-purple-2 text-size-md">${linkElem.textContent}</span>
	`
}

const addEnvToHeader = () => {
	if (!window.parent.__ENV__) return

	const spanElem = document.querySelector('.sidebar-header a:not([href="#storybook-preview-wrapper"]) > span')
	spanElem.innerHTML += `
		<span class="flex gap-xs-1 justify-end mt-xs-3 text-color-grey-3 text-size-xs font-weight-sm">
			<span class="px-xs-3 py-xs-0 bg-color-hover-2 rounded-sm">${window.parent.__ENV__.BUILD_MODE}</span>
			<span class="px-xs-3 py-xs-0 bg-color-hover-2 rounded-sm">${window.parent.__ENV__.DS_VERSION}</span>
		</div>
	`
}

window.addEventListener('load', () => {
	fixHeader()

	// Wait for iframe to load
	wait(500).then(addEnvToHeader)
})
