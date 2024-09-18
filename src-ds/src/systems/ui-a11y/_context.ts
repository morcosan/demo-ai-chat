import { createContext } from 'react'

export const ATTR_KEY__A11Y_MODE = 'data-a11y-mode'

export interface Store {
	a11yMode: A11yMode
	isPointer: boolean
}

export const Context = createContext<Store>({
	a11yMode: 'default',
	isPointer: false,
})
