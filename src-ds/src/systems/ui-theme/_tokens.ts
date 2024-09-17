import {
	getTokenValue,
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
	$color: Record<keyof typeof TOKENS__COLOR, string>
	$fontSize: Record<keyof typeof TOKENS__FONT_SIZE, string>
	$fontWeight: Record<keyof typeof TOKENS__FONT_WEIGHT, string>
	$lineHeight: Record<keyof typeof TOKENS__LINE_HEIGHT, string>
	$radius: Record<keyof typeof TOKENS__RADIUS, string>
	$shadow: Record<keyof typeof TOKENS__SHADOW, string>
	$spacing: Record<keyof typeof TOKENS__SPACING, string>
	$zIndex: Record<keyof typeof TOKENS__Z_INDEX, string>
}

const mapTokens = (tokenGroup: DesignTokenGroup, scheme: ColorScheme) => {
	return Object.fromEntries(
		Object.entries<DesignToken>(tokenGroup).map(([tokenName, token]) => [
			tokenName,
			ENV__USE_CSS_VARS ? `var(${token.$css})` : String(getTokenValue(tokenGroup, tokenName, scheme)),
		])
	) as Record<string, string>
}

const createTokens = (scheme: ColorScheme): ThemeTokens => {
	return {
		$color: mapTokens(TOKENS__COLOR, scheme),
		$fontSize: mapTokens(TOKENS__FONT_SIZE, scheme),
		$fontWeight: mapTokens(TOKENS__FONT_WEIGHT, scheme),
		$lineHeight: mapTokens(TOKENS__LINE_HEIGHT, scheme),
		$radius: mapTokens(TOKENS__RADIUS, scheme),
		$shadow: mapTokens(TOKENS__SHADOW, scheme),
		$spacing: mapTokens(TOKENS__SPACING, scheme),
		$zIndex: mapTokens(TOKENS__Z_INDEX, scheme),
	}
}

export const TOKENS__LIGHT_THEME = createTokens('light')
export const TOKENS__DARK_THEME = createTokens('dark')
