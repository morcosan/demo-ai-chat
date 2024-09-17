import { CSSObject } from '@emotion/react'
import { CSSProperties, ReactNode } from 'react'

declare global {
	// Based on Design Tokens Format Module: https://tr.designtokens.org/format
	type DesignToken<V = DesignTokenValue> =
		| {
				readonly $value: V
				readonly $ref?: undefined
				readonly $css: string
				readonly $type?: DesignTokenType
				readonly $description?: string
		  }
		| {
				readonly $value?: undefined
				readonly $ref: string | DesignTokenThemeValue<string>
				readonly $css: string
				readonly $type?: DesignTokenType
				readonly $description?: string
		  }
	type DesignTokenGroup<V = DesignTokenValue> = {
		readonly $description?: string
		readonly [key: string]: DesignToken<V>
	}
	type DesignTokenThemeValue<V = string | number> = Record<ColorScheme, V>
	type DesignTokenValue<V = string | number> = V | DesignTokenThemeValue<V>
	type DesignTokenType =
		| 'color'
		| 'fontSize'
		| 'fontWeight'
		| 'lineHeight'
		| 'radius'
		| 'shadow'
		| 'spacing'
		| 'zIndex'

	type ColorDesignToken = DesignToken<ColorDesignTokenValue>
	type ColorDesignTokenGroup = DesignTokenGroup<ColorDesignTokenValue>
	type ColorDesignTokenValue = string | Record<ColorScheme, string>

	type A11yMode = 'default' | 'pointer'
	type ColorScheme = 'light' | 'dark'
	type UiLibrary = 'custom' | 'material' | 'antdesign'

	interface ReactProps {
		className?: string
		style?: CSSProperties
		children?: ReactNode
	}

	type JsxProps<C> = C extends JsxFn<infer P> ? P : unknown
	type JsxFn<P> = (props: P) => unknown

	type CSS = CSSObject

	interface Pagination {
		page: number
		count: number
	}
}
