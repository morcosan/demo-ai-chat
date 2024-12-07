import type { Options } from 'prettier'

export const CODE_LANGUAGES = ['javascript', 'typescript', 'css', 'scss', 'html', 'xhtml', 'json', 'svg', 'xml']

export interface FormatResult {
	code: string
	error?: unknown
}

export const formatCode = async (code: string, lang: string, options?: Options): Promise<FormatResult> => {
	if (!CODE_LANGUAGES.includes(lang)) return { code }

	try {
		const prettier = await import('prettier/standalone')
		const jsPlugin = await import('prettier/plugins/babel')
		const htmlPlugin = await import('prettier/plugins/html')
		const cssPlugin = await import('prettier/plugins/postcss')
		const tsPlugin = await import('prettier/plugins/typescript')
		const estreePlugin = await import('prettier/plugins/estree')

		const langByPlugin = {
			babel: ['javascript'],
			html: ['html', 'xhtml', 'svg', 'xml'],
			json: ['json'],
			scss: ['css', 'scss'],
			typescript: ['typescript'],
		}
		const parser = (Object.entries(langByPlugin).find(([, langs]) => langs.includes(lang)) || [])[0]

		return {
			code: await prettier.format(code, {
				parser,
				plugins: [jsPlugin, tsPlugin, htmlPlugin, cssPlugin, estreePlugin.default],
				...(options || {}),
			}),
		}
	} catch (error) {
		// Expected error, no need for logs
		return { code, error }
	}
}
