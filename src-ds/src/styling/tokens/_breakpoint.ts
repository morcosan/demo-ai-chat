export const TOKENS__BREAKPOINT = {
	xs: { $value: '420px' },
	sm: { $value: '640px' },
	md: { $value: '768px' },
	lg: { $value: '1024px' },
	xl: { $value: '1440px' },
	xxl: { $value: '1920px' },
} as const satisfies DesignTokenGroup<string>
