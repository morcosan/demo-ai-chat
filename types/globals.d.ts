declare interface DesignToken {
	name: string
	css: string
	value: number | string | ThemeRecord
	unit?: string
	ref?: string | ThemeRecord
}

declare type Theme = 'light' | 'dark'
declare type ThemeRecord = Record<Theme, number | string>
