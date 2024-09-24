import { addons, types, useGlobals } from '@storybook/manager-api'
import { create } from '@storybook/theming'
import { useEffect } from 'react'
import { ATTR_KEY__COLOR_THEME, COLOR_THEMES } from '../src-ds/release/.storybook'
import { COOKIE__DS_COLOR_THEME } from '../src-utils/release'
import { TOOLTIP__COLOR_THEME, TOOLTIP__UI_LIBRARY } from './_constants'

addons.setConfig({
	theme: create({
		base: 'light',
		brandTitle: 'AI Chat Design',
	}),
	isFullscreen: false,
	showNav: true,
	showPanel: true,
	panelPosition: 'right',
	sidebarAnimations: true,
	enableShortcuts: false,
	showToolbar: true,
	selectedPanel: undefined,
})

addons.add('custom', {
	type: types.TOOL,
	title: '',
	render: function CustomAddon() {
		const [globals, setGlobals] = useGlobals() as [StoryGlobals, (g: StoryGlobals) => void, unknown, unknown]

		const htmlElem = document.documentElement
		const setHtmlAttr = (theme?: ColorTheme) => theme && htmlElem.setAttribute(ATTR_KEY__COLOR_THEME, theme)

		useEffect(() => {
			const theme = localStorage.getItem(COOKIE__DS_COLOR_THEME) as ColorTheme | null | undefined

			if (theme && COLOR_THEMES.includes(theme)) {
				setHtmlAttr(theme)

				// Storybook cannot update globals instantly (dunno why)
				wait(300).then(() => {
					setGlobals({ ...globals, colorTheme: theme })
				})
			}
		}, [])

		useEffect(() => {
			window.__GLOBALS__ = globals
			window.__TOOLTIPS__ = { colorTheme: TOOLTIP__COLOR_THEME, uiLibrary: TOOLTIP__UI_LIBRARY }
			setHtmlAttr(globals.colorTheme)
		}, [globals])

		return null
	},
})
