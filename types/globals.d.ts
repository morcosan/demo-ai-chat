declare interface DesignToken {
	name: string
	value: number | string | TokenValue
	unit?: string
	ref?: string | TokenString
}

declare type TokenValue = Record<ColorTheme, number | string>
declare type TokenString = Record<ColorTheme, string>

declare type ColorTheme = 'light' | 'dark'
declare type A11yTheme = 'default' | 'pointer'

declare interface ReactProps {
	children: any
}
