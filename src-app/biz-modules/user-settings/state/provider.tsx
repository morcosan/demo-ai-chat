import { randomAvatar } from '@utils/release'
import { createContext, useMemo } from 'react'

export interface Store {
	avatar: string
}

export const Context = createContext<Store>({
	avatar: '',
})

export const SettingsProvider = ({ children }: ReactProps) => {
	const avatar = useMemo(() => randomAvatar(), [])

	const store: Store = useMemo(
		() => ({
			avatar,
		}),
		[avatar]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
