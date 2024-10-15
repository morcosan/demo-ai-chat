export const TOKENS__BLUR = {
	xs: { $value: '1px', $css: '--ds-blur-xs' },
	sm: { $value: '2px', $css: '--ds-blur-sm' },
	md: { $value: '4px', $css: '--ds-blur-md' },
	lg: { $value: '6px', $css: '--ds-blur-lg' },

	subtle: { $ref: 'sm', $css: '--ds-blur-subtle' },
	default: { $ref: 'md', $css: '--ds-blur-default' },
} as const satisfies DesignTokenGroup<string>
