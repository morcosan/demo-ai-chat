import { useEffect, useMemo, useState } from 'react'
import { ATTR_KEY__COLOR_SCHEME, Context, Store } from './_context'
import { TOKENS__DARK_THEME, TOKENS__LIGHT_THEME, ThemeTokens } from './_tokens'

interface Props extends ReactProps {
	cookieKey: string
}

export const UiThemeProvider = ({ children, cookieKey }: Props) => {
	const [scheme, setScheme] = useState<ColorScheme>('light')
	const [tokens, setTokens] = useState<ThemeTokens>(TOKENS__LIGHT_THEME)

	const MEDIA_QUERY_DARK = '(prefers-color-scheme: dark)'
	const SCHEMES: ColorScheme[] = ['light', 'dark']

	const isDark = useMemo(() => scheme === 'dark', [scheme])
	const isLight = useMemo(() => scheme === 'light', [scheme])

	const htmlElem = document.documentElement
	const setHtmlAttr = (scheme: ColorScheme) => htmlElem.setAttribute(ATTR_KEY__COLOR_SCHEME, scheme)
	const setCookie = (scheme: ColorScheme) => localStorage.setItem(cookieKey, scheme)
	const getCookie = () => localStorage.getItem(cookieKey) as ColorScheme | null

	const changeTheme = (scheme: ColorScheme) => {
		setCookie(scheme)
		setHtmlAttr(scheme)
		setScheme(scheme)
		setTokens(scheme === 'light' ? TOKENS__LIGHT_THEME : TOKENS__DARK_THEME)
	}

	useEffect(() => {
		const scheme = getCookie()

		if (scheme && SCHEMES.includes(scheme)) {
			changeTheme(scheme)
		} else {
			changeTheme(window.matchMedia(MEDIA_QUERY_DARK).matches ? 'dark' : 'light')
		}
	}, [])

	const store: Store = useMemo(() => ({ ...tokens, scheme, isDark, isLight, changeTheme }), [scheme, tokens])

	return <Context.Provider value={store}>{children}</Context.Provider>
}
