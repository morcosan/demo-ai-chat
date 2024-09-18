import { createContext } from 'react'

export interface Store {
	uiLibrary: UiLibrary
	changeUiLibrary(library: UiLibrary): void
}

export const Context = createContext<Store>({
	uiLibrary: 'custom',
	changeUiLibrary() {},
})
