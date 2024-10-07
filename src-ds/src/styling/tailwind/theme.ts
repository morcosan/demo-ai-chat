import {
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

const createTokens = (tokenGroup: DesignTokenGroup, twPrefix: string): Record<string, string> => {
	return Object.fromEntries(
		Object.entries<DesignToken>(tokenGroup).map(([key, token]) => [twPrefix + key, `var(${token.$css})`])
	)
}

// USE_CSS_VARS env cannot be used with Tailwind, so CSS vars cannot be completely removed
// Tailwind doesn't support multiple theme configs, it requires `dark:` prefix for each class
// https://tailwindcss.com/docs/dark-mode
export const TAILWIND_THEME = {
	borderRadius: createTokens(TOKENS__RADIUS, ''),
	boxShadow: createTokens(TOKENS__SHADOW, ''),
	colors: createTokens(TOKENS__COLOR, 'color-'),
	fontSize: createTokens(TOKENS__FONT_SIZE, 'size-'),
	fontWeight: createTokens(TOKENS__FONT_WEIGHT, 'weight-'),
	lineHeight: createTokens(TOKENS__LINE_HEIGHT, ''),
	screens: createTokens(TOKENS__BREAKPOINT, ''),
	spacing: createTokens(TOKENS__SPACING, ''),
	zIndex: createTokens(TOKENS__Z_INDEX, ''),

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
