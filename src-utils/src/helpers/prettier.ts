import type { Options } from 'prettier'

export const CODE_LANGUAGES = ['javascript', 'typescript', 'css', 'scss', 'html', 'xhtml', 'json', 'svg', 'xml']

export const formatCode = async (code: string, lang: string, options?: Options): Promise<string> => {
	if (!CODE_LANGUAGES.includes(lang)) return code

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

	return prettier.format(code, {
		parser: getParserLanguage(),
		plugins: [jsParser, tsParser, htmlParser, cssParser],
		...(options || {}),
	})
}
