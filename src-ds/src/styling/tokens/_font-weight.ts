export const TOKENS__FONT_WEIGHT = {
	xs: { $value: 300, $css: '--ds-font-weight-xs' },
	sm: { $value: 400, $css: '--ds-font-weight-sm' },
	md: { $value: 500, $css: '--ds-font-weight-md' },
	lg: { $value: 600, $css: '--ds-font-weight-lg' },
	xl: { $value: 700, $css: '--ds-font-weight-xl' },
} as const satisfies DesignTokenGroup<number>
