import { AiChatProvider } from '@app/biz-modules/ai-chat/state'
import { SettingsProvider } from '@app/biz-modules/user-settings/state'
import { LoadingScreen } from '@app/core-modules/loading-screen'
import { UiA11yProvider, UiLibraryProvider, UiThemeProvider, UiViewportProvider } from '@ds/release'
import { I18nProvider } from '@i18n/release'
import { COOKIE__APP_COLOR_THEME, COOKIE__APP_UI_LIBRARY, Wrapper, Wrappers } from '@utils/release'
import { StrictMode, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Router } from './routing'
import './styling/index.css'

type Type =
	| typeof AiChatProvider
	| typeof LoadingScreen
	| typeof I18nProvider
	| typeof SettingsProvider
	| typeof StrictMode
	| typeof UiA11yProvider
	| typeof UiLibraryProvider
	| typeof UiThemeProvider
	| typeof UiViewportProvider

const providers: Wrapper<Type>[] = [
	{ elem: StrictMode },
	{ elem: I18nProvider },
	{ elem: LoadingScreen },
	{ elem: AiChatProvider },
	{ elem: SettingsProvider },
	{ elem: UiA11yProvider },
	{ elem: UiViewportProvider },
	{ elem: UiThemeProvider, props: { cookieKey: COOKIE__APP_COLOR_THEME } },
	{ elem: UiLibraryProvider, props: { cookieKey: COOKIE__APP_UI_LIBRARY } }, // Must be last, it forces re-rendering
]

const App = () => {
	// Having t() on window requires updating the entire app
	useTranslation()

	return (
		<Wrappers wrappers={providers}>
			<Suspense fallback={null}>
				<Router />
			</Suspense>
		</Wrappers>
	)
}

export default App
