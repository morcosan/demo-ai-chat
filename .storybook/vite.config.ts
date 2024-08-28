// noinspection DuplicatedCode
import '../.env' // Must be first

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { showBlueLogs } from '../.tooling/console'
import { createBuildNumber } from '../.tooling/versioning'

const ROOT_DIR = process.cwd()
const BUILD_MODE = process.env.BUILD_MODE
const IS_VALID_BUILD = Boolean(BUILD_MODE) // Preview and upgrading Storybook does not load env
const BUILD_NUMBER = createBuildNumber()

// Reset NODE_ENV
process.env.NODE_ENV = BUILD_MODE === 'local' ? 'development' : 'production'

// Show env logs
if (IS_VALID_BUILD) {
	showBlueLogs(
		'[ENV]',
		`\nNODE_ENV = ${process.env.NODE_ENV}`,
		`\nBUILD_MODE = ${BUILD_MODE}`,
		`\nBUILD_NUMBER = ${BUILD_NUMBER}`
	)
}

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	resolve: {
		alias: {
			'@ds': `${ROOT_DIR}/src-ds`,
		},
	},

	define: {
		ENV__BUILD_MODE: JSON.stringify(BUILD_MODE),
		ENV__BUILD_NUMBER: JSON.stringify(BUILD_NUMBER),
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
