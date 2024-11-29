import { createContext } from 'react'

export enum AiChatView {
	NONE,
	DESKTOP,
	MOBILE_CHAT,
	MOBILE_SUBCHAT,
}

export interface Store {
	activeView: AiChatView
	panelWidth: number
	setActiveView(tab: AiChatView): void
	setPanelWidth(width: number): void
}

export const LayoutContext = createContext<Store>({
	activeView: AiChatView.DESKTOP,
	panelWidth: 0,
	setActiveView: () => {},
	setPanelWidth: () => {},
})
