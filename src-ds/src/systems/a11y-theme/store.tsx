import { ATTR_KEY__A11Y_THEME, Keyboard } from '@ds/release'
import { createContext, useEffect, useMemo, useState } from 'react'

export interface Store {
	isPointer: boolean
}

export const Context = createContext<Store>({
	isPointer: false,
})

export const A11yThemeProvider = ({ children }: ReactProps) => {
	const [isPointer, setIsPointer] = useState(false)

	const setHtml = (theme: A11yTheme) => document.documentElement.setAttribute(ATTR_KEY__A11Y_THEME, theme)

	const onMouseDownWindow = (event: MouseEvent) => {
		// NVDA keyboard triggers mousedown with event.detail == 0
		// Standard mousedown has event.detail == 1
		if (event.detail) {
			setIsPointer(true)
			setHtml('pointer')
		}
	}

	const onKeyDownWindow = (event: KeyboardEvent) => {
		if (event.key === Keyboard.TAB) {
			setIsPointer(false)
			setHtml('default')
		}
	}

	const store = useMemo(() => ({ isPointer }), [isPointer])

	useEffect(() => {
		window.addEventListener('mousedown', onMouseDownWindow, true)
		window.addEventListener('keydown', onKeyDownWindow, true)

		return () => {
			window.removeEventListener('mousedown', onMouseDownWindow)
			window.removeEventListener('keydown', onKeyDownWindow)
		}
	}, [])

	return <Context.Provider value={store}>{children}</Context.Provider>
}
