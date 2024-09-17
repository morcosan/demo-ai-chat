import { AiChatProvider } from '@app/biz-modules/ai-chat/state'
import { UiA11yProvider, UiLibraryProvider, UiThemeProvider, Wrapper, Wrappers } from '@ds/release'
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
	{ elem: UiThemeProvider, props: { cookieKey: 'app-color-scheme' } },
	{ elem: UiLibraryProvider, props: { cookieKey: 'app-ui-library' } }, // Must be last, it forces re-rendering
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
