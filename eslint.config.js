import jsESLint from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tsESLint from 'typescript-eslint'

export default tsESLint.config(
	{
		/**
		 * https://github.com/eslint/eslint/issues/17400#issuecomment-1647463901
		 * `ignores` in the same object has the effect of not applying that configuration to files matching `ignores`
		 * `ignores` as the only key in a object has the effect of ESLint completely ignoring files matching `ignores`
		 */
		ignores: ['__dist-app', '__dist-ds', 'public'],
	},
	{
		extends: [jsESLint.configs.recommended, ...tsESLint.configs.recommended],

		files: ['**/*.{ts,tsx}'],

		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},

		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},

		rules: {
			...reactHooks.configs.recommended.rules,
			'react-hooks/exhaustive-deps': 'off', // This rule is broken, it gives false positives all the time
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
		},
	}
)
