import { useMemo } from 'react'

export const useDefaults = <P>(props: P, defaults: Partial<P>): P => {
	return useMemo(() => ({ ...defaults, ...props }), [props])
}
