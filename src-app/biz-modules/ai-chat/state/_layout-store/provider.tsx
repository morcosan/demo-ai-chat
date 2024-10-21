import { useMemo, useState } from 'react'
import { AiChatView, LayoutContext, Store } from './context'

export const LayoutProvider = ({ children }: ReactProps) => {
	const [activeView, setActiveView] = useState<AiChatView>(AiChatView.NONE)

	const store: Store = useMemo(() => ({ activeView, setActiveView }), [activeView])

	return <LayoutContext.Provider value={store}>{children}</LayoutContext.Provider>
}
