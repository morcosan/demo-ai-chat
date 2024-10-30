export const noExtForTsImports = {
	meta: {
		fixable: 'code',
	},
	create: (context) => ({
		ImportDeclaration: (node) => {
			const filePath = context.filename
			const isTsFile = filePath.endsWith('.ts') || filePath.endsWith('.tsx')

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
}
