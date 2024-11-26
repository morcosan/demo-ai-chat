import { AiChatProvider } from '@app/biz-modules/ai-chat/state'
import { UserAccountProvider } from '@app/biz-modules/user-settings/state'
import { LoadingScreen } from '@app/core-modules/loading-screen'
import { AppLayoutProvider } from '@app/layouts/state/_provider'
import { AppStyling } from '@app/styling'
import { UiA11yProvider, UiLibraryProvider, UiThemeProvider, UiViewportProvider } from '@ds/release'
import { I18nProvider, initI18n } from '@i18n/release'
import { COOKIE_KEY, Wrapper, Wrappers } from '@utils/release'
import { StrictMode, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { Router } from './routing'

type Type =
	| typeof AiChatProvider
	| typeof AppLayoutProvider
	| typeof AppStyling
	| typeof I18nProvider
	| typeof LoadingScreen
	| typeof StrictMode
	| typeof UiA11yProvider
	| typeof UiLibraryProvider
	| typeof UiThemeProvider
	| typeof UiViewportProvider
	| typeof UserAccountProvider

const providers: Wrapper<Type>[] = [
	{ elem: StrictMode },
	{ elem: I18nProvider },
	{ elem: AppLayoutProvider },
	{ elem: AiChatProvider },
	{ elem: UserAccountProvider },
	{ elem: LoadingScreen },
	{ elem: UiA11yProvider },
	{ elem: UiViewportProvider },
	{ elem: UiThemeProvider, props: { cookieKey: COOKIE_KEY.APP_COLOR_THEME } },
	{ elem: AppStyling },
	{ elem: UiLibraryProvider, props: { cookieKey: COOKIE_KEY.APP_UI_LIBRARY } }, // Must be last, it forces re-rendering
]

initI18n(COOKIE_KEY.APP_LANGUAGE)

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
