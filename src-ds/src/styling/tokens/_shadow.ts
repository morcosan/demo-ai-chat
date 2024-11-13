export const TOKENS__SHADOW = {
	inner: {
		$value: {
			light: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.1)',
			dark: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.2)',
		},
	},
	xs: {
		$value: {
			light: '0 1px 2px 0 rgb(0 0 0 / 0.15)',
			dark: '0 1px 2px 0 rgb(0 0 0 / 0.4)',
		},
	},
	sm: {
		$value: {
			light: '0 1px 3px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.15)',
			dark: '0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.4)',
		},
	},
	md: {
		$value: {
			light: '0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.15)',
			dark: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
		},
	},
	lg: {
		$value: {
			light: '0 10px 15px -3px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.15)',
			dark: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
		},
	},
	xl: {
		$value: {
			light: '0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)',
			dark: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
		},
	},
	'below-sm': {
		$value: {
			light: '0 6px 6px -6px rgb(0 0 0 / 0.15)',
			dark: '0 6px 6px -6px rgb(0 0 0 / 0.6)',
		},
	},
	'below-md': {
		$value: {
			light: '0 10px 10px -10px rgb(0 0 0 / 0.15)',
			dark: '0 10px 10px -10px rgb(0 0 0 / 0.6)',
		},
	},
	'below-lg': {
		$value: {
			light: '0 14px 14px -14px rgb(0 0 0 / 0.15)',
			dark: '0 14px 14px -14px rgb(0 0 0 / 0.6)',
		},
	},
} as const satisfies DesignTokenGroup<DesignTokenThemeValue<string>>
