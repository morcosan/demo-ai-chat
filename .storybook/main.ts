import { StorybookConfig } from '@storybook/react-vite'
import { InlineConfig } from 'vite'
import viteConfig from './vite.config'

const ROOT_DIR = process.cwd()

const config: StorybookConfig = {
	stories: [`${ROOT_DIR}/src-ds/docs/stories/**/*.story.tsx`],

	addons: [
		'@storybook/addon-controls',
		'@storybook/addon-actions', // This must be after controls
		'@storybook/addon-measure',
		'@storybook/addon-outline',
		'@storybook/addon-a11y',
		'@storybook/addon-toolbars',
	],

	staticDirs: [`${ROOT_DIR}/src-ds/docs/public`],

	framework: {
		name: '@storybook/react-vite',
		options: {
			builder: {
				viteConfigPath: `${ROOT_DIR}/.storybook/vite.config.ts`,
			},
		},
	},

	// Storybook bugs:
	// `assetsInclude` is overridden
	viteFinal: async (config: InlineConfig) => {
		config.assetsInclude = viteConfig.assetsInclude || config.assetsInclude
		return config
	},
}

export default config
