const THEMES: Theme[] = ['light', 'dark']

export const loadAppTheme = () => {
	let theme = localStorage.getItem('theme') as Theme | null

	if (!theme || !THEMES.includes(theme)) {
		theme = 'light'
	}

	setAppTheme(theme)
}

export const setAppTheme = (theme: Theme) => {
	document.documentElement.setAttribute('data-theme', theme)
	localStorage.setItem('theme', theme)
}

export const getAppTheme = (): Theme => document.documentElement.getAttribute('data-theme') as Theme
