export const SHADOW_TOKENS: DesignToken[] = [
	{
		name: 'shadow-xs',
		css: 'var(--ds-shadow-xs)',
		value: { light: '0 1px 2px 0 rgb(0 0 0 / 0.05)', dark: '0 1px 2px 0 rgb(0 0 0 / 0.2)' },
	},
	{
		name: 'shadow-sm',
		css: 'var(--ds-shadow-sm)',
		value: {
			light: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
			dark: '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
		},
	},
	{
		name: 'shadow-md',
		css: 'var(--ds-shadow-md)',
		value: {
			light: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
			dark: '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
		},
	},
	{
		name: 'shadow-lg',
		css: 'var(--ds-shadow-lg)',
		value: {
			light: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
			dark: '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
		},
	},
	{
		name: 'shadow-xl',
		css: 'var(--ds-shadow-xl)',
		value: {
			light: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
			dark: '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
		},
	},
	{
		name: 'shadow-inner',
		css: 'var(--ds-shadow-inner)',
		value: { light: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', dark: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.2)' },
	},
]
