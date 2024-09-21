import { useUiTheme } from '@ds/release'
import { ThemeProvider } from '@mui/material'
import { ConfigProvider } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { ANT_DARK_THEME_CONFIG, ANT_LIGHT_THEME_CONFIG } from '../../styling/themes/ant-design'
import { MUI_DARK_THEME_CONFIG, MUI_LIGHT_THEME_CONFIG } from '../../styling/themes/material-ui'
import { Caching } from './_caching'
import { Context, Store } from './_context'

interface Props extends ReactProps {
	cookieKey: string
	uiLibrary?: UiLibrary
}

export const UiLibraryProvider = (props: Props) => {
	const { isUiLight } = useUiTheme()
	const [uiLibrary, setUiLibrary] = useState<UiLibrary>('custom')

	const setCookie = (library: UiLibrary) => localStorage.setItem(props.cookieKey, library)
	const getCookie = () => localStorage.getItem(props.cookieKey) as UiLibrary | null

	const changeUiLibrary = (library: UiLibrary) => {
		setCookie(library)
		setUiLibrary(library)
	}

	useEffect(() => {
		if (props.uiLibrary) {
			changeUiLibrary(props.uiLibrary)
			return
		}

		const LIBRARIES: UiLibrary[] = ['custom', 'material', 'antdesign']
		const library = getCookie()

		changeUiLibrary(library && LIBRARIES.includes(library) ? library : 'custom')
	}, [])

	useEffect(() => {
		props.uiLibrary && changeUiLibrary(props.uiLibrary)
	}, [props.uiLibrary])

	const muiTheme = useMemo(() => (isUiLight ? MUI_LIGHT_THEME_CONFIG : MUI_DARK_THEME_CONFIG), [isUiLight])
	const antTheme = useMemo(() => (isUiLight ? ANT_LIGHT_THEME_CONFIG : ANT_DARK_THEME_CONFIG), [isUiLight])

	const store: Store = useMemo(() => ({ uiLibrary, changeUiLibrary }), [uiLibrary])

	return (
		<Context.Provider value={store}>
			<Caching uiLibrary={uiLibrary}>
				{uiLibrary === 'custom' && props.children}
				{uiLibrary === 'antdesign' && <ConfigProvider theme={antTheme}>{props.children}</ConfigProvider>}
				{uiLibrary === 'material' && <ThemeProvider theme={muiTheme}>{props.children}</ThemeProvider>}
			</Caching>
		</Context.Provider>
	)
}
