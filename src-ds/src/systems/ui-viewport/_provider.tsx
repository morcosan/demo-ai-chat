import { TOKENS__BREAKPOINT } from '@ds/release'
import { debounce } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { Context, Store } from './_context'

const BREAKPOINT = Object.fromEntries(
	Object.entries(TOKENS__BREAKPOINT).map(([key, token]: [string, DesignToken]) => [
		key,
		parseInt(token.$value as string),
	])
)

export const UiViewportProvider = ({ children }: ReactProps) => {
	const [viewportWidth, setViewportWidth] = useState(0)

	const isViewportMinXS = viewportWidth >= BREAKPOINT['xs']
	const isViewportMinSM = viewportWidth >= BREAKPOINT['sm']
	const isViewportMinMD = viewportWidth >= BREAKPOINT['md']
	const isViewportMinLG = viewportWidth >= BREAKPOINT['lg']
	const isViewportMinXL = viewportWidth >= BREAKPOINT['xl']
	const isViewportMinXXL = viewportWidth >= BREAKPOINT['xl']

	const isViewportMaxXS = viewportWidth < BREAKPOINT['xs']
	const isViewportMaxSM = viewportWidth < BREAKPOINT['sm']
	const isViewportMaxMD = viewportWidth < BREAKPOINT['md']
	const isViewportMaxLG = viewportWidth < BREAKPOINT['lg']
	const isViewportMaxXL = viewportWidth < BREAKPOINT['xl']
	const isViewportMaxXXL = viewportWidth < BREAKPOINT['xxl']

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
