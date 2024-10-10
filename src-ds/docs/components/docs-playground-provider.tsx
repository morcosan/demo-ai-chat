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
	const playgroundBgClass = cx({
		'docs-bg docs-bg-tiles': playgroundStyle === 'tiles',
		'docs-bg docs-bg-grid': playgroundStyle === 'grid',
		'docs-bg docs-bg-blank': playgroundStyle === 'blank',
	})

	const store: Store = useMemo(
		() => ({ playgroundBgClass, playgroundStyle: playgroundStyle as DocsPlaygroundStyle }),
		[playgroundStyle]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
