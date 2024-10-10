export const TOKENS__Z_INDEX = {
	lv1: { $value: 1000, $css: '--ds-z-index-lv1' },
	lv2: { $value: 2000, $css: '--ds-z-index-lv2' },
	lv3: { $value: 3000, $css: '--ds-z-index-lv3' },
	lv4: { $value: 4000, $css: '--ds-z-index-lv4' },
	lv5: { $value: 5000, $css: '--ds-z-index-lv5' },
	lv6: { $value: 6000, $css: '--ds-z-index-lv6' },
	lv7: { $value: 7000, $css: '--ds-z-index-lv7' },
	lv8: { $value: 8000, $css: '--ds-z-index-lv8' },
	lv9: { $value: 9000, $css: '--ds-z-index-lv9' },

	sticky: { $ref: 'lv1', $css: '--ds-z-index-sticky' },
	navbar: { $ref: 'lv2', $css: '--ds-z-index-navbar' },
	modal: { $ref: 'lv3', $css: '--ds-z-index-modal' },
	popup: { $ref: 'lv4', $css: '--ds-z-index-popup' },
	dropdown: { $ref: 'lv5', $css: '--ds-z-index-dropdown' },
	toast: { $ref: 'lv6', $css: '--ds-z-index-toast' },
	tooltip: { $ref: 'lv9', $css: '--ds-z-index-tooltip' },
} as const satisfies DesignTokenGroup<number>
