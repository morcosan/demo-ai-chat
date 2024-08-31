import { COLOR_TOKENS } from '../tokens/color'
import { FONT_SIZE_TOKENS } from '../tokens/font-size.ts'
import { FONT_WEIGHT_TOKENS } from '../tokens/font-weight'
import { LINE_HEIGHT_TOKENS } from '../tokens/line-height.ts'
import { RADIUS_TOKENS } from '../tokens/radius'
import { SHADOW_TOKENS } from '../tokens/shadow.ts'
import { SPACING_TOKENS } from '../tokens/spacing'
import { Z_INDEX_TOKENS } from '../tokens/z-index'

const createConfig = (tokens: DesignToken[], prefix: string): Record<string, string | number> => {
	const reduceFn = (sum: Record<string, string>, token: DesignToken) => ({
		...sum,
		[token.name.replace(prefix, '')]: `var(--ds-${token.name})`,
	})

	return tokens.reduce(reduceFn, {})
}

export const theme = {
	borderRadius: createConfig(RADIUS_TOKENS, 'radius-'),
	boxShadow: createConfig(SHADOW_TOKENS, 'shadow-'),
	colors: createConfig(COLOR_TOKENS, 'N/A'),
	fontSize: createConfig(FONT_SIZE_TOKENS, 'font-'),
	fontWeight: createConfig(FONT_WEIGHT_TOKENS, 'font-'),
	lineHeight: createConfig(LINE_HEIGHT_TOKENS, 'line-height-'),
	spacing: createConfig(SPACING_TOKENS, 'spacing-'),
	zIndex: createConfig(Z_INDEX_TOKENS, 'z-index-'),

	extend: {
		borderRadius: { none: 0 },
		height: { screen: '100vh' },
		margin: { 0: 0, px: '1px', auto: 'auto' },
		padding: { 0: 0, px: '1px' },
		width: { screen: '100vw' },
		zIndex: { 0: 0 },
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
