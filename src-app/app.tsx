import { AiChatProvider } from '@app/biz-modules/ai-chat/state'
import { UiA11yProvider, UiLibraryProvider, UiThemeProvider } from '@ds/release'
import { COOKIE__APP_COLOR_THEME, COOKIE__APP_UI_LIBRARY, Wrapper, Wrappers } from '@utils/release'
import { StrictMode, Suspense } from 'react'
import { Router } from './routing'
import './styles/index.css'

type Type =
	| typeof StrictMode
	| typeof AiChatProvider
	| typeof UiA11yProvider
	| typeof UiThemeProvider
	| typeof UiLibraryProvider

const providers: Wrapper<Type>[] = [
	{ elem: StrictMode },
	{ elem: AiChatProvider },
	{ elem: UiA11yProvider },
	{ elem: UiThemeProvider, props: { cookieKey: COOKIE__APP_COLOR_THEME } },
	{ elem: UiLibraryProvider, props: { cookieKey: COOKIE__APP_UI_LIBRARY } }, // Must be last, it forces re-rendering
]

const App = () => {
	return (
		<Wrappers wrappers={providers}>
			<Suspense fallback={null}>
				<Router />
			</Suspense>
		</Wrappers>
	)
}

export default App
