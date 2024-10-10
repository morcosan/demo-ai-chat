export const TOKENS__BREAKPOINT = {
	xs: { $value: '320px', $css: '--ds-breakpoint-xs' },
	sm: { $value: '640px', $css: '--ds-breakpoint-sm' },
	md: { $value: '768px', $css: '--ds-breakpoint-md' },
	lg: { $value: '1024px', $css: '--ds-breakpoint-lg' },
	xl: { $value: '1440px', $css: '--ds-breakpoint-xl' },
	xxl: { $value: '1920px', $css: '--ds-breakpoint-xxl' },
} as const satisfies DesignTokenGroup<string>
