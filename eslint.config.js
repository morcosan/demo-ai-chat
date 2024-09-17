import jsESLint from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tsESLint from 'typescript-eslint'
import { dsPlugin } from './.tooling/eslint/ds-plugin.js'

export default tsESLint.config(
	{
		/**
		 * https://github.com/eslint/eslint/issues/17400#issuecomment-1647463901
		 * `ignores` in the same object has the effect of not applying that configuration to files matching `ignores`
		 * `ignores` as the only key in an object has the effect of ESLint completely ignoring files matching `ignores`
		 */
		ignores: ['__dist-app', '__dist-ds', 'public'],
	},
	{
		extends: [jsESLint.configs.recommended, ...tsESLint.configs.recommended],

		files: ['**/*.{ts,tsx}'],

		settings: {
			react: { version: 'detect' },
		},

		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},

		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'react-refresh': reactRefreshPlugin,
			'@ds': dsPlugin,
		},

		rules: {
			...reactPlugin.configs.recommended.rules,
			'react/button-has-type': 'error',
			'react/hook-use-state': 'error',
			'react/jsx-boolean-value': 'error',
			'react/jsx-curly-brace-presence': ['error', 'never'],
			'react/jsx-fragments': 'error',
			'react/jsx-no-constructed-context-values': 'error',
			'react/jsx-no-leaked-render': 'error',
			'react/jsx-no-useless-fragment': 'error',
			'react/jsx-pascal-case': 'error',
			'react/jsx-props-no-spread-multi': 'error',
			'react/no-this-in-sfc': 'error',
			'react/no-unstable-nested-components': 'error',
			'react/react-in-jsx-scope': 'off',
			'react/self-closing-comp': 'error',
			'react/void-dom-elements-no-children': 'error',
			'react/function-component-definition': [
				'error',
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
			'react/jsx-sort-props': [
				'error',
				{
					callbacksLast: true,
					shorthandLast: true,
					multiline: 'ignore',
					ignoreCase: true,
					noSortAlphabetically: true,
					reservedFirst: true,
				},
			],
			'react/no-unknown-property': ['error', { ignore: ['css'] }],

			...reactHooksPlugin.configs.recommended.rules,
			'react-hooks/exhaustive-deps': 'off', // This rule is broken, it gives false positives all the time

			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-unused-vars': 'warn',
			'@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],

			'@ds/only-import-from-release': 'error',
		},
	}
)
