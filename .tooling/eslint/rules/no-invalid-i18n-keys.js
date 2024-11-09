import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const enJson = require('../../../src-i18n/src/translations/en-US.json')

const flattenObject = (obj, prefix = '') => {
	return Object.entries(obj).reduce(
		(acc, [key, value]) => ({
			...acc,
			...(typeof value === 'object'
				? flattenObject(value, `${prefix}${key}.`)
				: { [`${prefix}${key.replace(/_(?:zero|one|two|few|many|other)$/, '')}`]: value }),
		}),
		{}
	)
}
const validKeys = flattenObject(enJson)

export const noInvalidI18nKeys = {
	create: (context) => ({
		CallExpression(node) {
			if (node.callee.name === 't') {
				const key = node.arguments[0].value

				if (key && !validKeys[key]) {
					context.report({ node, message: `Translation key "${key}" is not valid` })
				}
			}
		},
	}),
}
