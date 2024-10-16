export {}
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
	type DesignTokenThemeValue<V = string | number> = Record<ColorTheme, V>
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

	type A11yMode = 'default' | 'pointer'
	type ColorTheme = 'light' | 'dark'
	type UiLibrary = 'custom' | 'material' | 'antdesign'
}
