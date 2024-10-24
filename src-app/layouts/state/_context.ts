import { createContext } from 'react'

export const COOKIE__PINNED_NAVBAR = 'app-pinned-navbar'

export interface Store {
	isNavPinned: boolean
	setIsNavPinned(value: boolean): void
}

export const Context = createContext<Store>({
	isNavPinned: false,
	setIsNavPinned: () => {},
})
