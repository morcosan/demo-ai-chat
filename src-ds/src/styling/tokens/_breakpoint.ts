export const TOKENS__BREAKPOINT = {
	xs: { $value: 320, $css: '--ds-breakpoint-xs' },
	sm: { $value: 640, $css: '--ds-breakpoint-sm' },
	md: { $value: 768, $css: '--ds-breakpoint-md' },
	lg: { $value: 1024, $css: '--ds-breakpoint-lg' },
	xl: { $value: 1440, $css: '--ds-breakpoint-xl' },
	xxl: { $value: 1920, $css: '--ds-breakpoint-xxl' },
} as const satisfies DesignTokenGroup<number>
