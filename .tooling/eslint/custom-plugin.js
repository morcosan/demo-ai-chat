import { noExtForTsImports } from './rules/no-ext-for-ts-imports.js'
import { noInvalidI18nKeys } from './rules/no-invalid-i18n-keys.js'
import { onlyImportFromRelease } from './rules/only-import-from-release.js'

export const customPlugin = {
	rules: {
		'no-invalid-i18n-keys': noInvalidI18nKeys,
		'no-ext-for-ts-imports': noExtForTsImports,
		'only-import-from-release': onlyImportFromRelease,
	},
	configs: {
		'custom/no-invalid-i18n-keys': 'error',
		'custom/no-ext-for-ts-imports': 'error',
		'custom/only-import-from-release': 'error',
	},
}
