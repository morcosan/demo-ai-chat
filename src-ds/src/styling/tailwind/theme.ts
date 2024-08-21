import { COLOR_TOKENS } from '../tokens/color'
import { FONT_WEIGHT_TOKENS } from '../tokens/font-weight'
import { RADIUS_TOKENS } from '../tokens/radius'
import { SPACING_TOKENS } from '../tokens/spacing'
import { Z_INDEX_TOKENS } from '../tokens/z-index'

const createConfig = (tokens: DesignToken[], prefix: string): Record<string, string | number> => {
	const reduceFn = (sum: Record<string, string>, token: DesignToken) => ({
		...sum,
		[token.name.replace(prefix, '')]: token.css,
	})

	return tokens.reduce(reduceFn, {})
}

export const theme = {
	fontSize: {}, // Will be set in CSS as `font-size-` instead of default `text-size-`
	lineHeight: {}, // Will be set in CSS as `line-height-` instead of default `leading-`
	borderRadius: createConfig(RADIUS_TOKENS, 'z-index-'),
	colors: createConfig(COLOR_TOKENS, 'color-'),
	fontWeight: createConfig(FONT_WEIGHT_TOKENS, 'font-'),
	zIndex: createConfig(Z_INDEX_TOKENS, 'z-index-'),
	spacing: createConfig(SPACING_TOKENS, 'spacing-'),

	extend: {
		borderRadius: { none: 0 },
		width: { screen: '100vw' },
		height: { screen: '100vh' },
		padding: { 0: 0, px: '1px' },
		margin: { 0: 0, px: '1px', auto: 'auto' },
		size: {
			0: 0,
			px: '1px',
			full: '100%',
			fit: 'fit-content',
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
