import { randomAvatar, randomFullName } from '@utils/release'
import { useMemo } from 'react'
import { Context, Store } from './_context'

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
