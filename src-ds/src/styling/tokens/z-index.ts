export const Z_INDEX_TOKENS: DesignToken[] = [
	{ name: 'z-index-lv1', value: 1000 },
	{ name: 'z-index-lv2', value: 2000 },
	{ name: 'z-index-lv3', value: 3000 },
	{ name: 'z-index-lv4', value: 4000 },
	{ name: 'z-index-lv5', value: 5000 },
	{ name: 'z-index-lv6', value: 6000 },
	{ name: 'z-index-lv7', value: 7000 },
	{ name: 'z-index-lv8', value: 8000 },
	{ name: 'z-index-lv9', value: 9000 },

	{ name: 'z-index-sticky', value: 1000, ref: 'z-index-lv1' },
	{ name: 'z-index-modal', value: 2000, ref: 'z-index-lv2' },
	{ name: 'z-index-popup', value: 3000, ref: 'z-index-lv3' },
	{ name: 'z-index-dropdown', value: 4000, ref: 'z-index-lv4' },
	{ name: 'z-index-toast', value: 5000, ref: 'z-index-lv5' },
	{ name: 'z-index-tooltip', value: 9000, ref: 'z-index-lv9' },
]
