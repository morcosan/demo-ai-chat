import { TOKENS__BREAKPOINT } from './_breakpoint'
import { TOKENS__COLOR } from './_color'
import { TOKENS__FONT_SIZE } from './_font-size'
import { TOKENS__FONT_WEIGHT } from './_font-weight'
import { TOKENS__LINE_HEIGHT } from './_line-height'
import { TOKENS__RADIUS } from './_radius'
import { TOKENS__SHADOW } from './_shadow'
import { TOKENS__SPACING } from './_spacing'
import { TOKENS__Z_INDEX } from './_z-index'

const getTokenValue = <K extends string, V>(
	tokenGroup: DesignTokenGroup<V>,
	tokenName: K,
	theme?: ColorTheme
): V => {
	const token = tokenGroup[tokenName] as DesignToken<V>
	if (!token) return undefined as V

	let value: V = undefined as V
	let ref: string

	if (token.$value !== undefined) {
		if (typeof token.$value === 'object') {
			value = (token.$value as DesignTokenThemeValue<V>)[theme as ColorTheme]
			if (!value) return undefined as V
		} else {
			value = token.$value
		}
	}

	if (token.$ref !== undefined) {
		if (typeof token.$ref === 'object') {
			ref = (token.$ref as DesignTokenThemeValue<string>)[theme as ColorTheme]
			if (!ref) return undefined as V
		} else {
			ref = token.$ref
		}

		value = getTokenValue<K, V>(tokenGroup, ref as K, theme)
	}

	return value
}

type Breakpoint = keyof typeof TOKENS__BREAKPOINT
type Color = keyof typeof TOKENS__COLOR
type FontSize = keyof typeof TOKENS__FONT_SIZE
type FontWeight = keyof typeof TOKENS__FONT_WEIGHT
type LineHeight = keyof typeof TOKENS__LINE_HEIGHT
type Radius = keyof typeof TOKENS__RADIUS
type Shadow = keyof typeof TOKENS__SHADOW
type Spacing = keyof typeof TOKENS__SPACING
type ZIndex = keyof typeof TOKENS__Z_INDEX
type CS = ColorTheme
type ThemeValue<V> = DesignTokenThemeValue<V>

const gV = getTokenValue

const getTokenValue_BREAKPOINT = (k: Breakpoint, cs?: CS) => gV<Breakpoint, number>(TOKENS__BREAKPOINT, k, cs)
const getTokenValue_COLOR = (k: Color, cs?: CS) => gV<Color, string>(TOKENS__COLOR, k, cs)
const getTokenValue_FONT_SIZE = (k: FontSize, cs?: CS) => gV<FontSize, string>(TOKENS__FONT_SIZE, k, cs)
const getTokenValue_FONT_WEIGHT = (k: FontWeight, cs?: CS) => gV<FontWeight, number>(TOKENS__FONT_WEIGHT, k, cs)
const getTokenValue_LINE_HEIGHT = (k: LineHeight, cs?: CS) => gV<LineHeight, string>(TOKENS__LINE_HEIGHT, k, cs)
const getTokenValue_RADIUS = (k: Radius, cs?: CS) => gV<Radius, string>(TOKENS__RADIUS, k, cs)
const getTokenValue_SHADOW = (k: Shadow, cs?: CS) => gV<Shadow, ThemeValue<string>>(TOKENS__SHADOW, k, cs)
const getTokenValue_SPACING = (k: Spacing, cs?: CS) => gV<Spacing, string>(TOKENS__SPACING, k, cs)
const getTokenValue_Z_INDEX = (k: ZIndex, cs?: CS) => gV<ZIndex, number>(TOKENS__Z_INDEX, k, cs)

export {
	getTokenValue,
	getTokenValue_BREAKPOINT,
	getTokenValue_COLOR,
	getTokenValue_FONT_SIZE,
	getTokenValue_FONT_WEIGHT,
	getTokenValue_LINE_HEIGHT,
	getTokenValue_RADIUS,
	getTokenValue_SHADOW,
	getTokenValue_SPACING,
	getTokenValue_Z_INDEX,
	TOKENS__BREAKPOINT,
	TOKENS__COLOR,
	TOKENS__FONT_SIZE,
	TOKENS__FONT_WEIGHT,
	TOKENS__LINE_HEIGHT,
	TOKENS__RADIUS,
	TOKENS__SHADOW,
	TOKENS__SPACING,
	TOKENS__Z_INDEX,
}
