export const Z_INDEX_TOKENS: DesignToken[] = [
	{ name: 'z-index-z1', value: 1000 },
	{ name: 'z-index-z2', value: 2000 },
	{ name: 'z-index-z3', value: 3000 },
	{ name: 'z-index-z4', value: 4000 },
	{ name: 'z-index-z5', value: 5000 },
	{ name: 'z-index-z6', value: 6000 },
	{ name: 'z-index-z7', value: 7000 },
	{ name: 'z-index-z8', value: 8000 },
	{ name: 'z-index-z9', value: 9000 },

	{ name: 'z-index-sticky', value: 1000, ref: 'z-index-z1' },
	{ name: 'z-index-modal', value: 2000, ref: 'z-index-z2' },
	{ name: 'z-index-popup', value: 3000, ref: 'z-index-z3' },
	{ name: 'z-index-dropdown', value: 4000, ref: 'z-index-z4' },
	{ name: 'z-index-toast', value: 5000, ref: 'z-index-z5' },
	{ name: 'z-index-tooltip', value: 9000, ref: 'z-index-z9' },
]
