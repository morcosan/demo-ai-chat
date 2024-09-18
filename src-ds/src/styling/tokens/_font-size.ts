export const TOKENS__FONT_SIZE = {
	xs: { $value: '0.75rem', $css: '--ds-font-size-xs' },
	sm: { $value: '0.875rem', $css: '--ds-font-size-sm' },
	md: { $value: '1rem', $css: '--ds-font-size-md' },
	lg: { $value: '1.25rem', $css: '--ds-font-size-lg' },
	xl: { $value: '1.5rem', $css: '--ds-font-size-xl' },
	xxl: { $value: '2rem', $css: '--ds-font-size-xxl' },
} as const satisfies DesignTokenGroup<string>
