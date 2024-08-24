export const dsPlugin = {
	rules: {
		'only-import-from-release': {
			meta: {
				fixable: 'code',
			},
			create: (context) => ({
				ImportDeclaration: (node) => {
					const path = node.source.value
					const isDS = path.startsWith('@ds/') || path.includes('../src-ds/')
					const isValid = path.startsWith('@ds/release') || path.startsWith('@ds/docs')

					if (isDS && !isValid) {
						context.report({
							node,
							message: "DS imports must use '@ds/release'",
							fix: (fixer) => fixer.replaceText(node.source, `'@ds/release'`),
						})
					}
				},
			}),
		},
	},
}
