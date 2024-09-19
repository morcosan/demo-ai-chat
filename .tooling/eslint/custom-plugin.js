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
					const isUtils = path.startsWith('@utils/') || path.includes('../src-utils/')

					if (isDS) {
						const isValid =
							path.startsWith('@ds/release') ||
							path.startsWith('@ds/docs') ||
							path.startsWith('@ds/changelog') ||
							path.includes('version.json')

						if (!isValid) {
							context.report({
								node,
								message: "DS imports must use '@ds/release'",
								fix: (fixer) => fixer.replaceText(node.source, `'@ds/release'`),
							})
						}
					}

					if (isUtils) {
						const isValid = path.startsWith('@utils/release')

						if (!isValid) {
							context.report({
								node,
								message: "Utils imports must use '@utils/release'",
								fix: (fixer) => fixer.replaceText(node.source, `'@utils/release'`),
							})
						}
					}
				},
			}),
		},
	},
}
