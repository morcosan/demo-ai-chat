import { createContext } from 'react'
import { TOKENS__LIGHT_THEME, ThemeTokens } from './_tokens'

export interface Store extends ThemeTokens {
	scheme: ColorScheme
	isDark: boolean
	isLight: boolean
	changeTheme(scheme: ColorScheme): void
}

export const Context = createContext<Store>({
	...TOKENS__LIGHT_THEME,
	scheme: 'light',
	isDark: false,
	isLight: true,
	changeTheme() {},
})
