import { forwardRef, ForwardRefRenderFunction, useImperativeHandle, useMemo } from 'react'

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

export const withRef = <P, T>(name: string, fn: ForwardRefRenderFunction<T, P>) => {
	const component = forwardRef(fn)
	component.displayName = name
	return component
}

export const defineRef = useImperativeHandle
