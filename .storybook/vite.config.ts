// noinspection DuplicatedCode
import '../.env' // Must be first

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import { showBlueLogs } from '../.tooling/console'
import { viteBuildPlugin, viteServerPlugin } from '../.tooling/storybook/styles-plugin'
import { createBuildNumber, getDsVersion } from '../.tooling/versioning'

const ROOT_DIR = process.cwd()
const BUILD_MODE = process.env.BUILD_MODE
const IS_VALID_BUILD = Boolean(BUILD_MODE) // Preview and upgrading Storybook does not load env
const BUILD_NUMBER = createBuildNumber()
const DS_VERSION = getDsVersion()
const USE_CSS_VARS = process.env.USE_CSS_VARS === 'true'

// Reset NODE_ENV
process.env.NODE_ENV = BUILD_MODE === 'local' ? 'development' : 'production'

// Show env logs
if (IS_VALID_BUILD) {
	showBlueLogs(
		'[ENV]',
		`\nNODE_ENV = ${process.env.NODE_ENV}`,
		`\nBUILD_MODE = ${BUILD_MODE}`,
		`\nBUILD_NUMBER = ${BUILD_NUMBER}`,
		`\nDS_VERSION = ${DS_VERSION}`,
		`\nUSE_CSS_VARS = ${USE_CSS_VARS}`
	)
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({ jsxImportSource: '@emotion/react' }),
		svgr({ include: '**/*.svg' }),
		viteServerPlugin(),
		viteBuildPlugin(),
	],

	resolve: {
		alias: {
			'@ds': `${ROOT_DIR}/src-ds`,
			'@i18n': `${ROOT_DIR}/src-i18n`,
			'@utils': `${ROOT_DIR}/src-utils`,
		},
	},

	define: {
		ENV__BUILD_MODE: JSON.stringify(BUILD_MODE),
		ENV__BUILD_NUMBER: JSON.stringify(BUILD_NUMBER),
		ENV__DS_VERSION: JSON.stringify(DS_VERSION),
		ENV__USE_CSS_VARS: JSON.stringify(USE_CSS_VARS),
	},

	build: {
		outDir: `${ROOT_DIR}/__dist-ds`, // Storybook bug: outDir must be set from CLI
		emptyOutDir: true,
	},

	server: {
		port: 9000, // Storybook bug: port must be set from CLI
		strictPort: true,
	},
	preview: {
		port: 9000,
	},
})
