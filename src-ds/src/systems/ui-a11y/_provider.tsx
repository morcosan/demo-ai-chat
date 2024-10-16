import { Keyboard } from '@utils/release'
import { useEffect, useMemo, useState } from 'react'
import { ATTR_KEY__A11Y_MODE, Context, Store } from './_context'

export const UiA11yProvider = ({ children }: ReactProps) => {
	const [a11yMode, setA11yMode] = useState<A11yMode>('default')

	const isPointer = a11yMode === 'pointer'

	const forceA11yMode = (mode: A11yMode) => {
		setA11yMode(mode)
		setHtmlAttr(mode)
	}

	const setHtmlAttr = (mode: A11yMode) => document.documentElement.setAttribute(ATTR_KEY__A11Y_MODE, mode)

	const onMouseDownWindow = (event: MouseEvent) => {
		// NVDA keyboard triggers mousedown with event.detail == 0
		// Standard mousedown has event.detail == 1
		if (event.detail) {
			setA11yMode('pointer')
			setHtmlAttr('pointer')
		}
	}

	const onKeyDownWindow = (event: KeyboardEvent) => {
		if (event.key === Keyboard.TAB) {
			setA11yMode('default')
			setHtmlAttr('default')
		}
	}

	useEffect(() => {
		window.addEventListener('mousedown', onMouseDownWindow, true)
		window.addEventListener('keydown', onKeyDownWindow, true)

		return () => {
			window.removeEventListener('mousedown', onMouseDownWindow, true)
			window.removeEventListener('keydown', onKeyDownWindow, true)
		}
	}, [])

	const store: Store = useMemo(() => ({ a11yMode, isPointer, forceA11yMode }), [a11yMode])

	return <Context.Provider value={store}>{children}</Context.Provider>
}
