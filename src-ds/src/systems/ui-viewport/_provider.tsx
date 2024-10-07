import { getTokenValue_BREAKPOINT } from '@ds/release'
import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { Context, Store } from './_context'

export const UiViewportProvider = ({ children }: ReactProps) => {
	const [viewportWidth, setViewportWidth] = useState(0)

	const isViewportMinXS = viewportWidth >= getTokenValue_BREAKPOINT('xs')
	const isViewportMinSM = viewportWidth >= getTokenValue_BREAKPOINT('sm')
	const isViewportMinMD = viewportWidth >= getTokenValue_BREAKPOINT('md')
	const isViewportMinLG = viewportWidth >= getTokenValue_BREAKPOINT('lg')
	const isViewportMinXL = viewportWidth >= getTokenValue_BREAKPOINT('xl')
	const isViewportMinXXL = viewportWidth >= getTokenValue_BREAKPOINT('xl')

	const isViewportMaxXS = viewportWidth < getTokenValue_BREAKPOINT('xs')
	const isViewportMaxSM = viewportWidth < getTokenValue_BREAKPOINT('sm')
	const isViewportMaxMD = viewportWidth < getTokenValue_BREAKPOINT('md')
	const isViewportMaxLG = viewportWidth < getTokenValue_BREAKPOINT('lg')
	const isViewportMaxXL = viewportWidth < getTokenValue_BREAKPOINT('xl')
	const isViewportMaxXXL = viewportWidth < getTokenValue_BREAKPOINT('xxl')

	const isViewportXS = isViewportMinXS && isViewportMaxSM
	const isViewportSM = isViewportMinSM && isViewportMaxMD
	const isViewportMD = isViewportMinMD && isViewportMaxLG
	const isViewportLG = isViewportMinLG && isViewportMaxXL
	const isViewportXL = isViewportMinXL && isViewportMaxXXL
	const isViewportXXL = isViewportMinXXL

	const onResizeWindow = debounce(() => setViewportWidth(window.innerWidth), 100)

	useEffect(() => {
		window.addEventListener('resize', onResizeWindow, true)
		onResizeWindow()

		return () => {
			window.removeEventListener('resize', onResizeWindow, true)
		}
	}, [])

	const store: Store = useMemo(
		() => ({
			viewportWidth,

			isViewportMinXS,
			isViewportMinSM,
			isViewportMinMD,
			isViewportMinLG,
			isViewportMinXL,
			isViewportMinXXL,

			isViewportMaxXS,
			isViewportMaxSM,
			isViewportMaxMD,
			isViewportMaxLG,
			isViewportMaxXL,
			isViewportMaxXXL,

			isViewportXS,
			isViewportSM,
			isViewportMD,
			isViewportLG,
			isViewportXL,
			isViewportXXL,
		}),
		[viewportWidth]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
