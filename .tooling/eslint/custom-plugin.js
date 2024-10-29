export const customPlugin = {
	rules: {
		'only-import-from-release': {
			meta: {
				fixable: 'code',
			},
			create: (context) => ({
				ImportDeclaration: (node) => {
					const path = node.source.value
					const isDS = path.startsWith('@ds/') || path.includes('../src-ds/')
					const isI18n = path.startsWith('@i18n/') || path.includes('../src-i18n/')
					const isUtils = path.startsWith('@utils/') || path.includes('../src-utils/')
					const isAppLib = path.startsWith('@app/library') || path.includes('../src-app/library/')

					if (isDS) {
						const isValid =
							(path.startsWith('@ds/release') && path !== '@ds/release/index.ts') ||
							path.startsWith('@ds/docs') ||
							path.startsWith('@ds/changelog') ||
							path.includes('version.json') ||
							context.filename.includes('.storybook')

						if (!isValid) {
							context.report({
								node,
								message: "DS imports must use '@ds/release'",
								fix: (fixer) => fixer.replaceText(node.source, `'@ds/release'`),
							})
						}
					}

					if (isI18n) {
						const isValid = path.startsWith('@i18n/release')

						if (!isValid) {
							context.report({
								node,
								message: "Utils imports must use '@i18n/release'",
								fix: (fixer) => fixer.replaceText(node.source, `'@i18n/release'`),
							})
						}
					}

					if (isUtils) {
						const isValid = path.startsWith('@utils/release') || context.filename.includes('.storybook')

						if (!isValid) {
							context.report({
								node,
								message: "Utils imports must use '@utils/release'",
								fix: (fixer) => fixer.replaceText(node.source, `'@utils/release'`),
							})
						}
					}

					if (isAppLib) {
						const isValid = path.startsWith('@app/library/release')

						if (!isValid) {
							context.report({
								node,
								message: "App library imports must use '@app/library/release'",
								fix: (fixer) => fixer.replaceText(node.source, `'@app/library/release'`),
							})
						}
					}
				},
			}),
		},

		'no-ts-extension-for-ts-imports': {
			meta: {
				fixable: 'code',
			},
			create: (context) => ({
				ImportDeclaration: (node) => {
					const filePath = context.filename
					const isTsFile = filePath.endsWith('.ts') || filePath.startsWith('.tsx')

					if (isTsFile) {
						const importPath = node.source.value
						const hasExt = importPath.endsWith('.ts') || importPath.endsWith('.tsx')

						if (hasExt) {
							const correctPath = node.source.value.replace(/(\.ts|\.tsx)$/, '')

							context.report({
								node,
								message: 'TS imports must not have .ts/.tsx extension',
								fix: (fixer) => fixer.replaceText(node.source, `'${correctPath}'`),
							})
						}
					}
				},
			}),
		},
	},
}
