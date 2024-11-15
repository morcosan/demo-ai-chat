import {
	CssPrefix,
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
} from '../tokens'

type CreateTokensArgs = [tokens: DesignTokenGroup, cssPrefix: string, twPrefix: string, direct?: boolean]

const createTokens = (...args: CreateTokensArgs): Record<string, string> => {
	const [tokens, cssPrefix, twPrefix, direct] = args

	return Object.fromEntries(
		Object.entries<DesignToken>(tokens).map(([tokenName, token]) => [
			twPrefix + tokenName,
			direct ? (token.$value as string) : `var(${cssPrefix}${tokenName})`,
		])
	)
}

// USE_CSS_VARS env cannot be used with Tailwind, so CSS vars cannot be completely removed
// Tailwind doesn't support multiple theme configs, it requires `dark:` prefix for each class
// https://tailwindcss.com/docs/dark-mode
export const TAILWIND_THEME = {
	backdropBlur: createTokens(TOKENS__BLUR, CssPrefix.BLUR, ''),
	borderRadius: createTokens(TOKENS__RADIUS, CssPrefix.RADIUS, ''),
	boxShadow: createTokens(TOKENS__SHADOW, CssPrefix.SHADOW, ''),
	colors: createTokens(TOKENS__COLOR, CssPrefix.COLOR, 'color-'),
	fontSize: createTokens(TOKENS__FONT_SIZE, CssPrefix.FONT_SIZE, 'size-'),
	fontWeight: createTokens(TOKENS__FONT_WEIGHT, CssPrefix.FONT_WEIGHT, 'weight-'),
	lineHeight: createTokens(TOKENS__LINE_HEIGHT, CssPrefix.LINE_HEIGHT, ''),
	screens: createTokens(TOKENS__BREAKPOINT, CssPrefix.BREAKPOINT, '', true),
	spacing: createTokens(TOKENS__SPACING, CssPrefix.SPACING, ''),
	zIndex: createTokens(TOKENS__Z_INDEX, CssPrefix.Z_INDEX, ''),

	extend: {
		borderRadius: { none: 0 },
		height: { screen: '100vh' },
		margin: { 0: 0, px: '1px', auto: 'auto' },
		padding: { 0: 0, px: '1px' },
		width: { screen: '100vw' },
		zIndex: { 0: 0, 1: 1 },
		spacing: {
			0: 0,
			px: '1px',
			full: '100%',
			fit: 'fit-content',
			unset: 'unset',
			'1/2': '50%',
			'1/3': '33.333333%',
			'2/3': '66.666667%',
			'1/4': '25%',
			'2/4': '50%',
			'3/4': '75%',
			'1/5': '20%',
			'2/5': '40%',
			'3/5': '60%',
			'4/5': '80%',
			'1/6': '16.666667%',
			'2/6': '33.333333%',
			'3/6': '50%',
			'4/6': '66.666667%',
			'5/6': '83.333333%',
		},
	},
}
