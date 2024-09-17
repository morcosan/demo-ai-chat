export const TOKENS__RADIUS = {
	xs: { $value: '4px', $css: '--ds-radius-xs' },
	sm: { $value: '6px', $css: '--ds-radius-sm' },
	md: { $value: '8px', $css: '--ds-radius-md' },
	lg: { $value: '12px', $css: '--ds-radius-lg' },
	xl: { $value: '16px', $css: '--ds-radius-xl' },
	max: { $value: '99px', $css: '--ds-radius-max' },
	full: { $value: '100%', $css: '--ds-radius-full' },
} as const satisfies DesignTokenGroup<string>
