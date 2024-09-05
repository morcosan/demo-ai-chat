import { ATTR_KEY__COLOR_THEME } from '@ds/release'
import { createContext, useEffect, useMemo, useState } from 'react'

export interface Store {
	theme: ColorTheme
	isDark: boolean
	isLight: boolean
	changeTheme(theme: ColorTheme): void
}

export const Context = createContext<Store>({
	theme: 'light',
	isDark: false,
	isLight: true,
	changeTheme() {},
})

interface Props extends ReactProps {
	cookieKey: string
}

export const ColorThemeProvider = ({ children, cookieKey }: Props) => {
	const [theme, setTheme] = useState('light' as ColorTheme)

	const MEDIA_QUERY_DARK = '(prefers-color-scheme: dark)'

	const isDark = useMemo(() => theme === 'dark', [theme])
	const isLight = useMemo(() => theme === 'light', [theme])

	const setHtml = (theme: ColorTheme) => document.documentElement.setAttribute(ATTR_KEY__COLOR_THEME, theme)
	const setCookie = (theme: ColorTheme) => localStorage.setItem(cookieKey, theme)
	const getCookie = () => localStorage.getItem(cookieKey) as ColorTheme | null

	const changeTheme = (theme: ColorTheme) => {
		setCookie(theme)
		setHtml(theme)
		setTheme(theme)
	}

	const store = useMemo(() => ({ theme, isDark, isLight, changeTheme }), [theme])

	useEffect(() => {
		const THEMES: ColorTheme[] = ['light', 'dark']
		const theme = getCookie()

		if (theme && THEMES.includes(theme)) {
			changeTheme(theme)
		} else {
			changeTheme(window.matchMedia(MEDIA_QUERY_DARK).matches ? 'dark' : 'light')
		}
	}, [])

	return <Context.Provider value={store}>{children}</Context.Provider>
}
