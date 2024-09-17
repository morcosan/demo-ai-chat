export const TOKENS__SHADOW = {
	inner: {
		$value: {
			light: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
			dark: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.2)',
		},
		$css: '--ds-shadow-inner',
	},
	xs: {
		$value: {
			light: '0 1px 2px 0 rgb(0 0 0 / 0.1)',
			dark: '0 1px 2px 0 rgb(0 0 0 / 0.2)',
		},
		$css: '--ds-shadow-xs',
	},
	sm: {
		$value: {
			light: '0 1px 3px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.15)',
			dark: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
		},
		$css: '--ds-shadow-sm',
	},
	md: {
		$value: {
			light: '0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.15)',
			dark: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
		},
		$css: '--ds-shadow-md',
	},
	lg: {
		$value: {
			light: '0 10px 15px -3px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.15)',
			dark: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
		},
		$css: '--ds-shadow-lg',
	},
	xl: {
		$value: {
			light: '0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)',
			dark: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
		},
		$css: '--ds-shadow-xl',
	},
} as const satisfies DesignTokenGroup<DesignTokenThemeValue<string>>
