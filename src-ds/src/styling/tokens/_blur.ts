export const TOKENS__BLUR = {
	xs: { $value: '1px' },
	sm: { $value: '2px' },
	md: { $value: '4px' },
	lg: { $value: '6px' },

	subtle: { $ref: 'sm' },
	default: { $ref: 'md' },
} as const satisfies DesignTokenGroup<string>
