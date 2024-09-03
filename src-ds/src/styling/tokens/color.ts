export const COLOR_TOKENS: DesignToken[] = [
	{ name: 'color-white', value: '#fff' },

	{ name: 'color-grey-1', value: '#f3f4f6' },
	{ name: 'color-grey-2', value: '#e5e7eb' },
	{ name: 'color-grey-3', value: '#d1d5db' },
	{ name: 'color-grey-4', value: '#9ca3af' },
	{ name: 'color-grey-5', value: '#6b7280' },
	{ name: 'color-grey-6', value: '#4b5563' },
	{ name: 'color-grey-7', value: '#374151' },
	{ name: 'color-grey-8', value: '#1f2937' },
	{ name: 'color-grey-9', value: '#111827' },

	{ name: 'color-purple-1', value: '#f3e8ff' },
	{ name: 'color-purple-2', value: '#c084fc' },
	{ name: 'color-purple-3', value: '#9333ea' },
	{ name: 'color-purple-4', value: '#6b21a8' },

	{ name: 'color-blue-1', value: '#e0f2fe' },
	{ name: 'color-blue-2', value: '#38bdf8' },
	{ name: 'color-blue-3', value: '#0284c7' },
	{ name: 'color-blue-4', value: '#075985' },

	{ name: 'color-green-1', value: '#dcfce7' },
	{ name: 'color-green-2', value: '#86efac' },
	{ name: 'color-green-3', value: '#16a34a' },
	{ name: 'color-green-4', value: '#166534' },

	{ name: 'color-orange-1', value: '#ffedd5' },
	{ name: 'color-orange-2', value: '#fb923c' },
	{ name: 'color-orange-3', value: '#ea580c' },
	{ name: 'color-orange-4', value: '#9a3412' },

	{ name: 'color-black-glass-1', value: 'rgba(0, 0, 0, 0.08)' },
	{ name: 'color-black-glass-2', value: 'rgba(0, 0, 0, 0.16)' },
	{ name: 'color-black-glass-3', value: 'rgba(0, 0, 0, 0.32)' },
	{ name: 'color-black-glass-4', value: 'rgba(0, 0, 0, 0.64)' },
	{ name: 'color-white-glass-1', value: 'rgba(255, 255, 255, 0.08)' },
	{ name: 'color-white-glass-2', value: 'rgba(255, 255, 255, 0.16)' },
	{ name: 'color-white-glass-3', value: 'rgba(255, 255, 255, 0.32)' },
	{ name: 'color-white-glass-4', value: 'rgba(255, 255, 255, 0.64)' },

	{
		name: 'color-background',
		value: { light: '#fff', dark: '#111827' },
		ref: { light: 'color-white', dark: 'color-grey-9' },
	},
	{
		name: 'color-navbar',
		value: { light: '#fff', dark: '#111827' },
		ref: { light: 'color-white', dark: 'color-grey-9' },
	},
	{
		name: 'color-text-default',
		value: { light: '#111827', dark: '#f4f4f5' },
		ref: { light: 'color-grey-9', dark: 'color-grey-1' },
	},
	{
		name: 'color-text-subtle',
		value: { light: '#71717a', dark: '#a1a1aa' },
		ref: { light: 'color-grey-5', dark: 'color-grey-4' },
	},
	{
		name: 'color-text-inverse',
		value: { light: '#fff', dark: '#111827' },
		ref: { light: 'color-white', dark: 'color-grey-9' },
	},
	{
		name: 'color-primary',
		value: { light: '#9333ea', dark: '#c084fc' },
		ref: { light: 'color-purple-3', dark: 'color-purple-2' },
	},
	{
		name: 'color-secondary',
		value: { light: '#0284c7', dark: '#38bdf8' },
		ref: { light: 'color-blue-3', dark: 'color-blue-2' },
	},
	{
		name: 'color-success',
		value: { light: '#16a34a', dark: '#86efac' },
		ref: { light: 'color-green-3', dark: 'color-green-2' },
	},
	{
		name: 'color-failure',
		value: { light: '#ea580c', dark: '#fb923c' },
		ref: { light: 'color-orange-3', dark: 'color-orange-2' },
	},
	{
		name: 'color-primary-bg',
		value: { light: '#f3e8ff', dark: '#581c87' },
		ref: { light: 'color-purple-1', dark: 'color-purple-4' },
	},
	{
		name: 'color-secondary-bg',
		value: { light: '#e0f2fe', dark: '#075985' },
		ref: { light: 'color-blue-1', dark: 'color-blue-4' },
	},
	{
		name: 'color-success-bg',
		value: { light: '#dcfce7', dark: '#166534' },
		ref: { light: 'color-green-1', dark: 'color-green-4' },
	},
	{
		name: 'color-failure-bg',
		value: { light: '#ffedd5', dark: '#9a3412' },
		ref: { light: 'color-orange-1', dark: 'color-orange-4' },
	},
	{
		name: 'color-primary-text',
		value: { light: '#581c87', dark: '#f3e8ff' },
		ref: { light: 'color-purple-4', dark: 'color-purple-1' },
	},
	{
		name: 'color-secondary-text',
		value: { light: '#075985', dark: '#e0f2fe' },
		ref: { light: 'color-blue-4', dark: 'color-blue-1' },
	},
	{
		name: 'color-success-text',
		value: { light: '#166534', dark: '#dcfce7' },
		ref: { light: 'color-green-4', dark: 'color-green-1' },
	},
	{
		name: 'color-failure-text',
		value: { light: '#9a3412', dark: '#ffedd5' },
		ref: { light: 'color-orange-4', dark: 'color-orange-1' },
	},
	{
		name: 'color-hover',
		value: { light: 'rgba(0, 0, 0, 0.16)', dark: 'rgba(255, 255, 255, 0.16)' },
		ref: { light: 'color-black-glass-2', dark: 'color-white-glass-2' },
	},
	{
		name: 'color-hover-bg',
		value: { light: 'rgba(0, 0, 0, 0.08)', dark: 'rgba(255, 255, 255, 0.08)' },
		ref: { light: 'color-black-glass-1', dark: 'color-white-glass-1' },
	},
	{
		name: 'color-hover-inverse',
		value: { light: 'rgba(255, 255, 255, 0.08)', dark: 'rgba(0, 0, 0, 0.08)' },
		ref: { light: 'color-white-glass-1', dark: 'color-black-glass-1' },
	},
	{
		name: 'color-modal-overlay',
		value: { light: 'rgba(0, 0, 0, 0.64)', dark: 'rgba(0, 0, 0, 0.64)' },
		ref: { light: 'color-black-glass-4', dark: 'color-black-glass-4' },
	},
	{
		name: 'color-border',
		value: { light: '#d4d4d8', dark: '#3f3f46' },
		ref: { light: 'color-grey-3', dark: 'color-grey-7' },
	},
	{
		name: 'color-border-active',
		value: { light: '#71717a', dark: '#71717a' },
		ref: { light: 'color-grey-5', dark: 'color-grey-5' },
	},
]
