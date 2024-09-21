import { useEffect, useMemo, useState } from 'react'
import { ATTR_KEY__COLOR_THEME, COLOR_THEMES, MEDIA_QUERY_DARK } from './_constants'
import { Context, Store } from './_context'
import { TOKENS__DARK_THEME, TOKENS__LIGHT_THEME, ThemeTokens } from './_tokens'

interface Props extends ReactProps {
	cookieKey: string
	colorTheme?: ColorTheme
}

export const UiThemeProvider = (props: Props) => {
	const [colorTheme, setColorTheme] = useState<ColorTheme>('light')
	const [tokens, setTokens] = useState<ThemeTokens>(TOKENS__LIGHT_THEME)

	const isUiDark = useMemo(() => colorTheme === 'dark', [colorTheme])
	const isUiLight = useMemo(() => colorTheme === 'light', [colorTheme])

	const htmlElem = document.documentElement
	const setHtmlAttr = (theme: ColorTheme) => htmlElem.setAttribute(ATTR_KEY__COLOR_THEME, theme)
	const setCookie = (theme: ColorTheme) => localStorage.setItem(props.cookieKey, theme)
	const getCookie = () => localStorage.getItem(props.cookieKey) as ColorTheme | null

	const changeUiTheme = (theme: ColorTheme) => {
		setCookie(theme)
		setHtmlAttr(theme)
		setColorTheme(theme)
		setTokens(theme === 'light' ? TOKENS__LIGHT_THEME : TOKENS__DARK_THEME)
	}

	useEffect(() => {
		if (props.colorTheme) {
			changeUiTheme(props.colorTheme)
			return
		}

		const theme = getCookie()

		if (theme && COLOR_THEMES.includes(theme)) {
			changeUiTheme(theme)
		} else {
			changeUiTheme(window.matchMedia(MEDIA_QUERY_DARK).matches ? 'dark' : 'light')
		}
	}, [])

	useEffect(() => {
		props.colorTheme && changeUiTheme(props.colorTheme)
	}, [props.colorTheme])

	const store: Store = useMemo(
		() => ({ ...tokens, colorTheme: colorTheme, isUiDark, isUiLight, changeColorTheme: changeUiTheme }),
		[tokens, colorTheme]
	)

	return <Context.Provider value={store}>{props.children}</Context.Provider>
}
