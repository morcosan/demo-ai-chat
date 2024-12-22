import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { useEffect } from 'react'

interface Props extends ReactProps {
	uiLibrary: UiLibrary
}

const createCssCache = (lib: UiLibrary) => createCache({ key: `css-${lib}`, prepend: true })
const getCssCache = (lib: UiLibrary) => {
	if (lib === 'custom') return cacheCustom
	if (lib === 'mantine') return cacheMantine
	if (lib === 'antdesign') return cacheAntDesign
	if (lib === 'material') return cacheMaterial
	return cacheCustom
}
const cacheCustom = createCssCache('custom')
const cacheMantine = createCssCache('mantine')
const cacheAntDesign = createCssCache('antdesign')
const cacheMaterial = createCssCache('material')

export const Caching = ({ uiLibrary, children }: Props) => {
	const removeStyles = () => {
		// Remove AntDesign <style> elements
		if (uiLibrary !== 'antdesign') {
			const selector = 'style[data-cache-path]'
			const head = document.head
			head.querySelectorAll(selector).forEach((elem) => head.removeChild(elem))
		}
	}

	useEffect(() => {
		removeStyles()
	}, [uiLibrary])

	return <CacheProvider value={getCssCache(uiLibrary)}>{children}</CacheProvider>
}
