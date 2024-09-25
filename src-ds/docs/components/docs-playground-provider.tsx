import { createContext, useContext, useMemo } from 'react'

interface Store {
	playgroundStyle: DocsPlaygroundStyle
	playgroundBgClass: string
}

const Context = createContext<Store>({
	playgroundStyle: 'grid',
	playgroundBgClass: '',
})

interface Props extends ReactProps {
	playgroundStyle?: DocsPlaygroundStyle
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDocsPlayground = () => useContext(Context)

export const DocsPlaygroundProvider = ({ children, playgroundStyle }: Props) => {
	const playgroundBgClass = useMemo(() => {
		if (playgroundStyle === 'tiles') return 'docs-bg docs-bg-tiles'
		if (playgroundStyle === 'grid') return 'docs-bg docs-bg-grid'
		if (playgroundStyle === 'blank') return 'docs-bg docs-bg-blank'
		return ''
	}, [playgroundStyle])

	const store: Store = useMemo(
		() => ({ playgroundBgClass, playgroundStyle: playgroundStyle as DocsPlaygroundStyle }),
		[playgroundStyle]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
