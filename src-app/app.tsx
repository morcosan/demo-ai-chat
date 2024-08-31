import { A11yThemeProvider, ColorThemeProvider } from '@ds/release'
import { StrictMode, Suspense } from 'react'
import { Router } from './routing'
import './styles/index.css'

const App = () => {
	return (
		<StrictMode>
			<A11yThemeProvider>
				<ColorThemeProvider cookieKey="color-theme">
					<Suspense fallback={null}>
						<Router />
					</Suspense>
				</ColorThemeProvider>
			</A11yThemeProvider>
		</StrictMode>
	)
}

export default App
