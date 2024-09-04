declare interface DesignToken {
	name: string
	value: number | string | TokenValue
	unit?: 'px' | '%' | 'rem' | 'em'
	ref?: string | TokenString
}

declare type TokenValue = Record<ColorTheme, number | string>
declare type TokenString = Record<ColorTheme, string>

declare type ColorTheme = 'light' | 'dark'
declare type A11yTheme = 'default' | 'pointer'

declare interface ReactProps {
	className?: string
	style?: Record<string, string | number>
	children?: any
}
declare interface ReactPath {
	pathname: string
	search: string
	hash: string
}
declare type ReactTo = string | Partial<ReactPath>

declare type JsxProps<C> = C extends JsxFn<infer P> ? P : unknown
declare type JsxFn<P> = (props: P) => unknown
