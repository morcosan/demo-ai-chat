// noinspection DuplicatedCode
import './.env' // Must be first

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { showBlueLogs } from './.tooling/console'

const ROOT_DIR = process.cwd()
const BUILD_MODE = process.env.BUILD_MODE
const IS_VALID_BUILD = Boolean(BUILD_MODE) // Preview is not loading env

// Reset NODE_ENV
process.env.NODE_ENV = BUILD_MODE === 'local' ? 'development' : 'production'

// Show env logs
IS_VALID_BUILD && showBlueLogs('[ENV]', '\nNODE_ENV =', process.env.NODE_ENV, '\nBUILD_MODE =', BUILD_MODE)

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	resolve: {
		alias: {
			'@api': `${ROOT_DIR}/src-api`,
			'@app': `${ROOT_DIR}/src-app`,
			'@ds': `${ROOT_DIR}/src-ds`,
		},
	},

	define: {
		ENV__BUILD_MODE: JSON.stringify(BUILD_MODE),
		ENV__BUILD_TIME: JSON.stringify(new Date().getTime()),
	},

	root: `${ROOT_DIR}/src-app`,
	publicDir: 'public',

	build: {
		outDir: `${ROOT_DIR}/__dist-app`,
		emptyOutDir: true,
	},

	server: {
		port: 8080,
		strictPort: true,
	},
	preview: {
		port: 8080,
	},
})
