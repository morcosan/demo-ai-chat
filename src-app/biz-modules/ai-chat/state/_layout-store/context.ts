import { createContext } from 'react'

export enum AiChatView {
	NONE,
	DESKTOP,
	MOBILE_CHAT,
	MOBILE_SUBCHAT,
}

export interface Store {
	activeView: AiChatView
	setActiveView(tab: AiChatView): void
}

export const LayoutContext = createContext<Store>({
	activeView: AiChatView.DESKTOP,
	setActiveView: () => {},
})
