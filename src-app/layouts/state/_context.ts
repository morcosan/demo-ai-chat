import { createContext } from 'react'

export interface Store {
	isNavPinned: boolean
	setIsNavPinned(value: boolean): void
}

export const Context = createContext<Store>({
	isNavPinned: false,
	setIsNavPinned: () => {},
})
