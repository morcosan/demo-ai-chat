import { useMemo } from 'react'

export const useDefaults = <P extends Record<string, any>>(
	rawProps: P,
	defaults: Partial<P>,
	truthy?: boolean
): P => {
	return useMemo(() => {
		const props = defaults as any

		Object.entries(rawProps).forEach(([key, value]) => {
			const isValid = truthy ? Boolean(value) : value !== undefined
			if (isValid) {
				props[key] = value
			}
		})

		return props
	}, [rawProps])
}
