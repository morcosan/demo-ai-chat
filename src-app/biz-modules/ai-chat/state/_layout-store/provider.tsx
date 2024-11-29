import { COOKIE_KEY } from '@utils/release'
import { useEffect, useMemo, useState } from 'react'
import { AiChatView, LayoutContext, Store } from './context'

export const LayoutProvider = ({ children }: ReactProps) => {
	const [activeView, setActiveView] = useState<AiChatView>(AiChatView.NONE)
	const [panelWidth, setPanelWidth] = useState(35)

	const loadPanelWidth = () => {
		const cookie = parseInt(localStorage.getItem(COOKIE_KEY.APP_PANEL_WIDTH) || '')
		const width = isNaN(cookie) ? 35 : cookie

		localStorage.setItem(COOKIE_KEY.APP_PANEL_WIDTH, width.toString())
		setPanelWidth(width)
	}

	useEffect(() => {
		loadPanelWidth()
	}, [])

	const store: Store = useMemo(
		() => ({
			activeView,
			panelWidth,
			setActiveView,
			setPanelWidth(width: number) {
				setPanelWidth(width)
				localStorage.setItem(COOKIE_KEY.APP_PANEL_WIDTH, width.toString())
			},
		}),
		[activeView, panelWidth]
	)

	return <LayoutContext.Provider value={store}>{children}</LayoutContext.Provider>
}
