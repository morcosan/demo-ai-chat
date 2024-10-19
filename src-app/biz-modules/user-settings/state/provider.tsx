import { randomAvatar, randomFullName } from '@utils/release'
import { createContext, useMemo } from 'react'

export interface Store {
	avatar: string
	name: string
}

export const Context = createContext<Store>({
	avatar: '',
	name: '',
})

export const SettingsProvider = ({ children }: ReactProps) => {
	const avatar = useMemo(() => randomAvatar(), [])
	const name = useMemo(() => randomFullName(), [])

	const store: Store = useMemo(
		() => ({
			avatar,
			name,
		}),
		[avatar, name]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
