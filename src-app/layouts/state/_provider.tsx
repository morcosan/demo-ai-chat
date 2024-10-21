import { useUiViewport } from '@ds/release'
import { useEffect, useMemo, useState } from 'react'
import { Context, COOKIE__PINNED_NAVBAR, Store } from './_context'

export const AppLayoutProvider = ({ children }: ReactProps) => {
	const { isViewportMinXL } = useUiViewport()
	const [isNavPinned, setIsNavPinned] = useState(false)

	const loadPinConfig = () => {
		const cookie = localStorage.getItem(COOKIE__PINNED_NAVBAR)
		const isPinned = cookie === 'true' || (cookie !== 'false' && isViewportMinXL)

		localStorage.setItem(COOKIE__PINNED_NAVBAR, isPinned ? 'true' : 'false')
		setIsNavPinned(isPinned)
	}

	useEffect(() => {
		loadPinConfig()
	}, [])

	const store: Store = useMemo(
		() => ({
			isNavPinned,
			setIsNavPinned: (value: boolean) => {
				setIsNavPinned(value)
				localStorage.setItem(COOKIE__PINNED_NAVBAR, value ? 'true' : 'false')
			},
		}),
		[isNavPinned]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
