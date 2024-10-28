import { useUiViewport } from '@ds/release'
import { COOKIE_KEY } from '@utils/release'
import { useEffect, useMemo, useState } from 'react'
import { Context, Store } from './_context'

export const AppLayoutProvider = ({ children }: ReactProps) => {
	const { isViewportMinXL } = useUiViewport()
	const [isNavPinned, setIsNavPinned] = useState(false)

	const loadPinConfig = () => {
		const cookie = localStorage.getItem(COOKIE_KEY.APP_PINNED_NAVBAR)
		const isPinned = cookie === 'true' || (cookie !== 'false' && isViewportMinXL)

		localStorage.setItem(COOKIE_KEY.APP_PINNED_NAVBAR, isPinned ? 'true' : 'false')
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
				localStorage.setItem(COOKIE_KEY.APP_PINNED_NAVBAR, value ? 'true' : 'false')
			},
		}),
		[isNavPinned]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
