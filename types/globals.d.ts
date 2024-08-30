declare interface DesignToken {
	name: string
	css: string
	value: number | string | TokenValue
	unit?: string
	ref?: string | TokenString
}

declare type TokenValue = Record<ColorTheme, number | string>
declare type TokenString = Record<ColorTheme, string>

declare type ColorTheme = 'light' | 'dark'

declare interface ReactProps {
	children: any
}
