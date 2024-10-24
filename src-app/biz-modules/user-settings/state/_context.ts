import { createContext } from 'react'

export interface Store {
	avatar: string
	name: string
}

export const Context = createContext<Store>({
	avatar: '',
	name: '',
})
