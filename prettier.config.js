/** @type {import('prettier').Config} */
export default {
	arrowParens: 'always',
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	printWidth: 115, // Approx 120 (tabs are counted as 1, but rendered as 2/3/4)
	semi: false,
	singleQuote: true,
	trailingComma: 'es5',
	useTabs: true,

	// Plugins
	plugins: ['prettier-plugin-css-order', 'prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],

	// Plugin: css-order
	cssDeclarationSorterOrder: 'concentric-css',
	cssDeclarationSorterCustomOrder: [],
	cssDeclarationSorterKeepOverrides: false,

	// Plugin: tailwindcss
	tailwindConfig: './tailwind.config.ts',
	tailwindFunctions: ['clsx', 'cx'],
}
