import { useUiTheme } from '@ds/release'
import { ThemeProvider } from '@mui/material'
import { ConfigProvider } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { ANTD_DARK_THEME, ANTD_LIGHT_THEME } from '../../styling/themes/ant-design'
import { MUI_DARK_THEME, MUI_LIGHT_THEME } from '../../styling/themes/material-ui'
import { Caching } from './_caching'
import { Context, Store } from './_context'

interface Props extends ReactProps {
	cookieKey: string
}

export const UiLibraryProvider = ({ children, cookieKey }: Props) => {
	const { isLight } = useUiTheme()

	const [uiLibrary, setUiLibrary] = useState<UiLibrary>('custom')

	const setCookie = (library: UiLibrary) => localStorage.setItem(cookieKey, library)
	const getCookie = () => localStorage.getItem(cookieKey) as UiLibrary | null

	const changeUiLibrary = (library: UiLibrary) => {
		setCookie(library)
		setUiLibrary(library)
	}

	useEffect(() => {
		const LIBRARIES: UiLibrary[] = ['custom', 'material', 'antdesign']
		const library = getCookie()

		changeUiLibrary(library && LIBRARIES.includes(library) ? library : 'custom')
	}, [])

	const muiTheme = useMemo(() => (isLight ? MUI_LIGHT_THEME : MUI_DARK_THEME), [isLight])
	const antdTheme = useMemo(() => (isLight ? ANTD_LIGHT_THEME : ANTD_DARK_THEME), [isLight])

	const store: Store = useMemo(() => ({ uiLibrary, changeUiLibrary }), [uiLibrary])

	return (
		<Context.Provider value={store}>
			<Caching uiLibrary={uiLibrary}>
				{uiLibrary === 'custom' && children}
				{uiLibrary === 'antdesign' && <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>}
				{uiLibrary === 'material' && <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>}
			</Caching>
		</Context.Provider>
	)
}
