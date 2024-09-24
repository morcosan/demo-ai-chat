import { readFileSync, writeFileSync } from 'node:fs'
import { IncomingMessage, ServerResponse } from 'node:http'
import postcss from 'postcss'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import { Plugin, ResolvedConfig, ViteDevServer } from 'vite'

const PUBLIC_TOKENS_CSS_PATH = '/ds-styles.css'
const SOURCE_TOKENS_CSS_PATH = process.cwd() + '/src-ds/release/.storybook/styles.css'

const _createStylesCss = async (): Promise<string> => {
	const cssCode = readFileSync(SOURCE_TOKENS_CSS_PATH)
	const result = await postcss([postcssImport, tailwindcss()]).process(cssCode, { from: SOURCE_TOKENS_CSS_PATH })

	return result.css
}

export const viteServerPlugin = (): Plugin => {
	return {
		name: 'vite-server-tokens',

		configureServer: (server: ViteDevServer) => {
			server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: Function) => {
				if (req.url?.startsWith(PUBLIC_TOKENS_CSS_PATH)) {
					res.setHeader('Content-Type', 'text/css;charset=UTF-8')
					res.end(await _createStylesCss())
				} else {
					next()
				}
			})
		},
	}
}

export const viteBuildPlugin = (): Plugin => {
	let outDir = ''

	return {
		name: 'vite-build-tokens',
		configResolved: (config: ResolvedConfig) => {
			outDir = config.build.outDir
		},
		buildEnd: async () => writeFileSync(outDir + PUBLIC_TOKENS_CSS_PATH, await _createStylesCss()),
	}
}
