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
		const jsParser = await import('prettier/parser-babel')
		const htmlParser = await import('prettier/parser-html')
		const cssParser = await import('prettier/parser-postcss')
		const tsParser = await import('prettier/parser-typescript')

		const languageMap = {
			javascript: ['javascript', 'json'],
			typescript: ['typescript'],
			scss: ['css', 'scss'],
			html: ['html', 'xhtml', 'svg', 'xml'],
		}

		const getParserLanguage = () => {
			const [language] = Object.entries(languageMap).find(([, languages]) => languages.includes(lang)) || []
			return language
		}

		return {
			code: await prettier.format(code, {
				parser: getParserLanguage(),
				plugins: [jsParser, tsParser, htmlParser, cssParser],
				...(options || {}),
			}),
		}
	} catch (error) {
		// Expected error, no need for logs
		return { code, error }
	}
}
