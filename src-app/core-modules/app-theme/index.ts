import { useMemo, useReducer } from 'react'

interface State {
	theme: Theme
}

const THEMES: Theme[] = ['light', 'dark']
const DEFAULTS: State = {
	theme: 'light',
}

const reducer = (state: State, action: Partial<State>): State => {
	const { theme } = action

	if (theme) return { ...state, theme }

	return state
}

export const useAppTheme = () => {
	const [state, dispatch] = useReducer(reducer, DEFAULTS)

	const isDark = useMemo(() => state.theme === 'dark', [state.theme])
	const isLight = useMemo(() => state.theme === 'light', [state.theme])

	const setTheme = (theme: Theme) => {
		dispatch({ theme })
		localStorage.setItem('theme', theme)
		document.documentElement.setAttribute('data-theme', theme)
	}

	const loadTheme = () => {
		let theme = localStorage.getItem('theme') as Theme | null

		if (!theme || !THEMES.includes(theme)) {
			theme = 'light'
		}

		setTheme(theme)
	}

	return {
		...state,
		isDark,
		isLight,
		setTheme,
		loadTheme,
	}
}
