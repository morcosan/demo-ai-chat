/** @type {import('prettier').Config} */
export default {
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	printWidth: 120,
	semi: false,
	singleQuote: true,
	trailingComma: 'es5',
	useTabs: true,

	// Plugins
	plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],

	// Plugin: tailwindcss
	tailwindConfig: './tailwind.config.ts',
}
