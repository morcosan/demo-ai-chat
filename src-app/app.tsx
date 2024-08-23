import { loadAppTheme } from '@app/core-modules/app-theme'
import { StrictMode, Suspense } from 'react'
import { Router } from './routing'
import './styles/index.css'

loadAppTheme()

const App = () => {
	return (
		<StrictMode>
			<Suspense fallback={null}>
				<Router />
			</Suspense>
		</StrictMode>
	)
}

export default App
