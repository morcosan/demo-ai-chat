import { createContext } from 'react'

export interface Store {
	a11yMode: A11yMode
	isPointer: boolean
}

export const Context = createContext<Store>({
	a11yMode: 'default',
	isPointer: false,
})
