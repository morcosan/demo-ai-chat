export const TOKENS__COLOR = {
	white: { $value: '#fff', $css: '--ds-color-white' },
	'grey-0': { $value: '#fafafa', $css: '--ds-color-grey-0' },
	'grey-1': { $value: '#f4f4f5', $css: '--ds-color-grey-1' },
	'grey-2': { $value: '#e4e4e7', $css: '--ds-color-grey-2' },
	'grey-3': { $value: '#d4d4d8', $css: '--ds-color-grey-3' },
	'grey-4': { $value: '#a1a1aa', $css: '--ds-color-grey-4' },
	'grey-5': { $value: '#71717a', $css: '--ds-color-grey-5' },
	'grey-6': { $value: '#52525b', $css: '--ds-color-grey-6' },
	'grey-7': { $value: '#3f3f46', $css: '--ds-color-grey-7' },
	'grey-8': { $value: '#27272a', $css: '--ds-color-grey-8' },
	'grey-9': { $value: '#18181b', $css: '--ds-color-grey-9' },

	'purple-1': { $value: '#f3e8ff', $css: '--ds-color-purple-1' },
	'purple-2': { $value: '#c084fc', $css: '--ds-color-purple-2' },
	'purple-3': { $value: '#9333ea', $css: '--ds-color-purple-3' },
	'purple-4': { $value: '#4c1874', $css: '--ds-color-purple-4' },

	'yellow-1': { $value: '#fef9c3', $css: '--ds-color-yellow-1' },
	'yellow-2': { $value: '#fef08a', $css: '--ds-color-yellow-2' },
	'yellow-3': { $value: '#fde047', $css: '--ds-color-yellow-3' },
	'yellow-4': { $value: '#713f12', $css: '--ds-color-yellow-4' },

	'green-1': { $value: '#dcfce7', $css: '--ds-color-green-1' },
	'green-2': { $value: '#86efac', $css: '--ds-color-green-2' },
	'green-3': { $value: '#16a34a', $css: '--ds-color-green-3' },
	'green-4': { $value: '#166534', $css: '--ds-color-green-4' },

	'red-1': { $value: '#fee2e2', $css: '--ds-color-red-1' },
	'red-2': { $value: '#f87171', $css: '--ds-color-red-2' },
	'red-3': { $value: '#dc2626', $css: '--ds-color-red-3' },
	'red-4': { $value: '#5e1717', $css: '--ds-color-red-4' },

	'blue-1': { $value: '#dbeafe', $css: '--ds-color-blue-1' },
	'blue-2': { $value: '#60a5fa', $css: '--ds-color-blue-2' },
	'blue-3': { $value: '#2563eb', $css: '--ds-color-blue-3' },
	'blue-4': { $value: '#1e40af', $css: '--ds-color-blue-4' },

	'black-glass-1': { $value: 'rgba(0, 0, 0, 0.08)', $css: '--ds-color-black-glass-1' },
	'black-glass-2': { $value: 'rgba(0, 0, 0, 0.16)', $css: '--ds-color-black-glass-2' },
	'black-glass-3': { $value: 'rgba(0, 0, 0, 0.24)', $css: '--ds-color-black-glass-3' },
	'black-glass-4': { $value: 'rgba(0, 0, 0, 0.32)', $css: '--ds-color-black-glass-4' },
	'black-glass-5': { $value: 'rgba(0, 0, 0, 0.40)', $css: '--ds-color-black-glass-5' },
	'black-glass-6': { $value: 'rgba(0, 0, 0, 0.48)', $css: '--ds-color-black-glass-6' },
	'black-glass-7': { $value: 'rgba(0, 0, 0, 0.56)', $css: '--ds-color-black-glass-7' },
	'black-glass-8': { $value: 'rgba(0, 0, 0, 0.64)', $css: '--ds-color-black-glass-8' },
	'black-glass-9': { $value: 'rgba(0, 0, 0, 0.72)', $css: '--ds-color-black-glass-9' },

	'white-glass-1': { $value: 'rgba(255, 255, 255, 0.08)', $css: '--ds-color-white-glass-1' },
	'white-glass-2': { $value: 'rgba(255, 255, 255, 0.16)', $css: '--ds-color-white-glass-2' },
	'white-glass-3': { $value: 'rgba(255, 255, 255, 0.24)', $css: '--ds-color-white-glass-3' },
	'white-glass-4': { $value: 'rgba(255, 255, 255, 0.32)', $css: '--ds-color-white-glass-4' },
	'white-glass-5': { $value: 'rgba(255, 255, 255, 0.40)', $css: '--ds-color-white-glass-5' },
	'white-glass-6': { $value: 'rgba(255, 255, 255, 0.48)', $css: '--ds-color-white-glass-6' },
	'white-glass-7': { $value: 'rgba(255, 255, 255, 0.56)', $css: '--ds-color-white-glass-7' },
	'white-glass-8': { $value: 'rgba(255, 255, 255, 0.64)', $css: '--ds-color-white-glass-8' },
	'white-glass-9': { $value: 'rgba(255, 255, 255, 0.72)', $css: '--ds-color-white-glass-9' },

	'bg-default': { $ref: { light: 'white', dark: 'grey-8' }, $css: '--ds-color-bg-default' },
	'bg-field': { $ref: { light: 'white', dark: 'grey-9' }, $css: '--ds-color-bg-field' },
	'bg-navbar': { $ref: { light: 'white', dark: 'grey-9' }, $css: '--ds-color-bg-navbar' },
	'bg-preview': { $ref: { light: 'black-glass-1', dark: 'black-glass-3' }, $css: '--ds-color-bg-preview' },
	'bg-scrollbar': { $ref: { light: 'black-glass-2', dark: 'white-glass-2' }, $css: '--ds-color-bg-scrollbar' },
	'bg-scrollbar-hover': {
		$ref: { light: 'black-glass-3', dark: 'white-glass-3' },
		$css: '--ds-color-bg-scrollbar-hover',
	},

	'text-default': { $ref: { light: 'grey-9', dark: 'grey-1' }, $css: '--ds-color-text-default' },
	'text-subtle': { $ref: { light: 'grey-5', dark: 'grey-4' }, $css: '--ds-color-text-subtle' },
	'text-inverse': { $ref: { light: 'white', dark: 'grey-9' }, $css: '--ds-color-text-inverse' },
	'text-preview': { $ref: { light: 'blue-4', dark: 'blue-1' }, $css: '--ds-color-text-preview' },

	primary: { $ref: { light: 'purple-3', dark: 'purple-2' }, $css: '--ds-color-primary' },
	'primary-bg': { $ref: { light: 'purple-1', dark: 'purple-4' }, $css: '--ds-color-primary-bg' },
	'primary-text-default': {
		$ref: { light: 'purple-4', dark: 'purple-1' },
		$css: '--ds-color-primary-text-default',
	},
	'primary-text-inverse': {
		$ref: { light: 'purple-1', dark: 'purple-4' },
		$css: '--ds-color-primary-text-inverse',
	},

	secondary: { $ref: { light: 'yellow-3', dark: 'yellow-2' }, $css: '--ds-color-secondary' },
	'secondary-bg': { $ref: { light: 'yellow-1', dark: 'yellow-4' }, $css: '--ds-color-secondary-bg' },
	'secondary-text-default': {
		$ref: { light: 'yellow-4', dark: 'yellow-1' },
		$css: '--ds-color-secondary-text-default',
	},
	'secondary-text-inverse': {
		$ref: { light: 'yellow-1', dark: 'yellow-4' },
		$css: '--ds-color-secondary-text-inverse',
	},

	success: { $ref: { light: 'green-3', dark: 'green-2' }, $css: '--ds-color-success' },
	'success-bg': { $ref: { light: 'green-1', dark: 'green-4' }, $css: '--ds-color-success-bg' },
	'success-text-default': { $ref: { light: 'green-4', dark: 'green-1' }, $css: '--ds-color-success-text-default' },
	'success-text-inverse': { $ref: { light: 'green-1', dark: 'green-4' }, $css: '--ds-color-success-text-inverse' },

	danger: { $ref: { light: 'red-3', dark: 'red-2' }, $css: '--ds-color-danger' },
	'danger-bg': { $ref: { light: 'red-1', dark: 'red-4' }, $css: '--ds-color-danger-bg' },
	'danger-text-default': { $ref: { light: 'red-4', dark: 'red-1' }, $css: '--ds-color-danger-text-default' },
	'danger-text-inverse': { $ref: { light: 'red-1', dark: 'red-4' }, $css: '--ds-color-danger-text-inverse' },

	'hover-1': { $ref: { light: 'black-glass-1', dark: 'black-glass-2' }, $css: '--ds-color-hover-1' },
	'hover-2': { $ref: { light: 'black-glass-2', dark: 'black-glass-3' }, $css: '--ds-color-hover-2' },
	'hover-3': { $ref: { light: 'black-glass-3', dark: 'black-glass-4' }, $css: '--ds-color-hover-3' },
	'hover-4': { $ref: { light: 'black-glass-4', dark: 'black-glass-5' }, $css: '--ds-color-hover-4' },
	'hover-default': { $ref: { light: 'hover-1', dark: 'hover-2' }, $css: '--ds-color-hover-default' },
	'hover-pressed': { $ref: { light: 'hover-2', dark: 'hover-4' }, $css: '--ds-color-hover-pressed' },

	'modal-overlay': { $ref: { light: 'black-glass-6', dark: 'black-glass-6' }, $css: '--ds-color-modal-overlay' },

	'border-default': { $ref: { light: 'grey-3', dark: 'grey-6' }, $css: '--ds-color-border-default' },
	'border-subtle': { $ref: { light: 'grey-2', dark: 'grey-7' }, $css: '--ds-color-border-subtle' },
	'border-shadow': { $ref: { light: 'grey-1', dark: 'grey-9' }, $css: '--ds-color-border-shadow' },
	'border-active': { $ref: { light: 'grey-5', dark: 'grey-4' }, $css: '--ds-color-border-active' },
} as const satisfies DesignTokenGroup<string>
