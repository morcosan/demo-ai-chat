import { useMemo, useState } from 'react'
import { AiChatView, LayoutContext, Store } from './context'

export const LayoutProvider = ({ children }: ReactProps) => {
	const [activeView, setActiveView] = useState<AiChatView>(AiChatView.NONE)
	const [panelWidth, setPanelWidth] = useState(35)

	const updatePanelWidth = (width: number) => {
		setPanelWidth(width)
	}

	const store: Store = useMemo(
		() => ({ activeView, panelWidth, setActiveView, updatePanelWidth }),
		[activeView, panelWidth]
	)

	return <LayoutContext.Provider value={store}>{children}</LayoutContext.Provider>
}
