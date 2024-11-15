import {
	CssPrefix,
	getTokenValue,
	TOKENS__BLUR,
	TOKENS__BREAKPOINT,
	TOKENS__COLOR,
	TOKENS__FONT_SIZE,
	TOKENS__FONT_WEIGHT,
	TOKENS__LINE_HEIGHT,
	TOKENS__RADIUS,
	TOKENS__SHADOW,
	TOKENS__SPACING,
	TOKENS__Z_INDEX,
} from '../../styling/tokens'

export interface ThemeTokens {
	$blur: Record<keyof typeof TOKENS__BLUR, string>
	$breakpoint: Record<keyof typeof TOKENS__BREAKPOINT, string>
	$color: Record<keyof typeof TOKENS__COLOR, string>
	$fontSize: Record<keyof typeof TOKENS__FONT_SIZE, string>
	$fontWeight: Record<keyof typeof TOKENS__FONT_WEIGHT, string>
	$lineHeight: Record<keyof typeof TOKENS__LINE_HEIGHT, string>
	$radius: Record<keyof typeof TOKENS__RADIUS, string>
	$shadow: Record<keyof typeof TOKENS__SHADOW, string>
	$spacing: Record<keyof typeof TOKENS__SPACING, string>
	$zIndex: Record<keyof typeof TOKENS__Z_INDEX, string>
}

const mapTokens = (tokenGroup: DesignTokenGroup, ccPrefix: string, theme: ColorTheme) => {
	return Object.fromEntries(
		Object.keys(tokenGroup).map((tokenName: string) => [
			tokenName,
			ENV__USE_CSS_VARS ? `var(${ccPrefix}${tokenName})` : String(getTokenValue(tokenGroup, tokenName, theme)),
		])
	) as Record<string, string>
}

const createTokens = (theme: ColorTheme): ThemeTokens => {
	return {
		$blur: mapTokens(TOKENS__BLUR, CssPrefix.BLUR, theme),
		$breakpoint: mapTokens(TOKENS__BREAKPOINT, CssPrefix.BREAKPOINT, theme),
		$color: mapTokens(TOKENS__COLOR, CssPrefix.COLOR, theme),
		$fontSize: mapTokens(TOKENS__FONT_SIZE, CssPrefix.FONT_SIZE, theme),
		$fontWeight: mapTokens(TOKENS__FONT_WEIGHT, CssPrefix.FONT_WEIGHT, theme),
		$lineHeight: mapTokens(TOKENS__LINE_HEIGHT, CssPrefix.LINE_HEIGHT, theme),
		$radius: mapTokens(TOKENS__RADIUS, CssPrefix.RADIUS, theme),
		$shadow: mapTokens(TOKENS__SHADOW, CssPrefix.SHADOW, theme),
		$spacing: mapTokens(TOKENS__SPACING, CssPrefix.SPACING, theme),
		$zIndex: mapTokens(TOKENS__Z_INDEX, CssPrefix.Z_INDEX, theme),
	}
}

export const TOKENS__LIGHT_THEME = createTokens('light')
export const TOKENS__DARK_THEME = createTokens('dark')
