export const COLOR_TOKENS: DesignToken[] = [
	{ name: 'color-white', css: 'var(--ds-color-white)', value: '#fff' },

	{ name: 'color-grey-1', css: 'var(--ds-color-grey-1)', value: '#f3f4f6' },
	{ name: 'color-grey-2', css: 'var(--ds-color-grey-2)', value: '#e5e7eb' },
	{ name: 'color-grey-3', css: 'var(--ds-color-grey-3)', value: '#d1d5db' },
	{ name: 'color-grey-4', css: 'var(--ds-color-grey-4)', value: '#9ca3af' },
	{ name: 'color-grey-5', css: 'var(--ds-color-grey-5)', value: '#6b7280' },
	{ name: 'color-grey-6', css: 'var(--ds-color-grey-6)', value: '#4b5563' },
	{ name: 'color-grey-7', css: 'var(--ds-color-grey-7)', value: '#374151' },
	{ name: 'color-grey-8', css: 'var(--ds-color-grey-8)', value: '#1f2937' },
	{ name: 'color-grey-9', css: 'var(--ds-color-grey-9)', value: '#111827' },

	{ name: 'color-purple-1', css: 'var(--ds-color-purple-1)', value: '#e9d5ff' },
	{ name: 'color-purple-2', css: 'var(--ds-color-purple-2)', value: '#c084fc' },
	{ name: 'color-purple-3', css: 'var(--ds-color-purple-3)', value: '#9333ea' },
	{ name: 'color-purple-4', css: 'var(--ds-color-purple-4)', value: '#6b21a8' },

	{ name: 'color-blue-1', css: 'var(--ds-color-blue-1)', value: '#bae6fd' },
	{ name: 'color-blue-2', css: 'var(--ds-color-blue-2)', value: '#38bdf8' },
	{ name: 'color-blue-3', css: 'var(--ds-color-blue-3)', value: '#0284c7' },
	{ name: 'color-blue-4', css: 'var(--ds-color-blue-4)', value: '#075985' },

	{ name: 'color-green-1', css: 'var(--ds-color-green-1)', value: '#dcfce7' },
	{ name: 'color-green-2', css: 'var(--ds-color-green-2)', value: '#86efac' },
	{ name: 'color-green-3', css: 'var(--ds-color-green-3)', value: '#16a34a' },
	{ name: 'color-green-4', css: 'var(--ds-color-green-4)', value: '#166534' },

	{ name: 'color-orange-1', css: 'var(--ds-color-orange-1)', value: '#ffedd5' },
	{ name: 'color-orange-2', css: 'var(--ds-color-orange-2)', value: '#fdba74' },
	{ name: 'color-orange-3', css: 'var(--ds-color-orange-3)', value: '#ea580c' },
	{ name: 'color-orange-4', css: 'var(--ds-color-orange-4)', value: '#9a3412' },

	{
		name: 'color-background',
		css: 'var(--ds-color-background)',
		value: { light: '#fff', dark: '#111827' },
		ref: { light: 'color-white', dark: 'color-grey-9' },
	},
	{
		name: 'color-navbar',
		css: 'var(--ds-color-navbar)',
		value: { light: '#fff', dark: '#111827' },
		ref: { light: 'color-white', dark: 'color-grey-9' },
	},
	{
		name: 'color-primary',
		css: 'var(--ds-color-primary)',
		value: { light: '#9333ea', dark: '#c084fc' },
		ref: { light: 'color-purple-3', dark: 'color-purple-2' },
	},
	{
		name: 'color-secondary',
		css: 'var(--ds-color-secondary)',
		value: { light: '#0284c7', dark: '#38bdf8' },
		ref: { light: 'color-blue-3', dark: 'color-blue-2' },
	},
	{
		name: 'color-text',
		css: 'var(--ds-color-text)',
		value: { light: '#111827', dark: '#fff' },
		ref: { light: 'color-grey-9', dark: 'color-white' },
	},
	{
		name: 'color-text-inverse',
		css: 'var(--ds-color-text-inverse)',
		value: { light: '#fff', dark: '#111827' },
		ref: { light: 'color-white', dark: 'color-grey-9' },
	},
]
