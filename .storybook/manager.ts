import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

addons.setConfig({
	theme: create({
		base: 'light',
		brandTitle: 'Demo Design System',
		brandUrl: 'STORYBOOK_LOGO_LINK',
		brandTarget: '_self',
	}),
	isFullscreen: false,
	showNav: true,
	showPanel: true,
	panelPosition: 'right',
	sidebarAnimations: true,
	enableShortcuts: false,
	showToolbar: true,
	selectedPanel: undefined,
})
