import { createContext, useEffect, useMemo, useState } from 'react'

const THEMES: ColorTheme[] = ['light', 'dark']
const COOKIE_KEY = 'theme'
const HTML_KEY = 'data-theme'

interface Store {
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

export const ColorThemeStore = ({ children }: ReactProps) => {
	const [theme, setTheme] = useState('light' as ColorTheme)

	const isDark = useMemo(() => theme === 'dark', [theme])
	const isLight = useMemo(() => theme === 'light', [theme])

	const setHtml = (theme: ColorTheme) => document.documentElement.setAttribute(HTML_KEY, theme)
	const setCookie = (theme: ColorTheme) => localStorage.setItem(COOKIE_KEY, theme)
	const getCookie = () => localStorage.getItem(COOKIE_KEY) as ColorTheme | null

	const changeTheme = (theme: ColorTheme) => {
		setCookie(theme)
		setHtml(theme)
		setTheme(theme)
	}

	const store = useMemo(() => ({ theme, isDark, isLight, changeTheme }), [theme])

	useEffect(() => {
		const theme = getCookie()
		changeTheme(theme && THEMES.includes(theme) ? theme : 'light')
	}, [])

	return <Context.Provider value={store}>{children}</Context.Provider>
}
