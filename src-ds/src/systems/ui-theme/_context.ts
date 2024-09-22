import { createContext } from 'react'
import { TOKENS__LIGHT_THEME, ThemeTokens } from './_tokens'

export interface Store extends ThemeTokens {
	colorTheme: ColorTheme
	isUiDark: boolean
	isUiLight: boolean
	changeColorTheme(theme: ColorTheme): void
}

export const Context = createContext<Store>({
	...TOKENS__LIGHT_THEME,
	colorTheme: 'light',
	isUiDark: false,
	isUiLight: true,
	changeColorTheme() {},
})
