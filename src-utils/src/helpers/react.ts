import { forwardRef, ForwardRefRenderFunction, PropsWithoutRef, useImperativeHandle, useMemo } from 'react'

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

export const withRef = <P, T>(name: string, fn: ForwardRefRenderFunction<T, PropsWithoutRef<P>>) => {
	const component = forwardRef(fn)
	component.displayName = name
	return component
}

export const defineRef = useImperativeHandle
