import { ColorThemeStore } from '@app/core-modules/color-theme/store.tsx'
import { StrictMode, Suspense } from 'react'
import { Router } from './routing'
import './styles/index.css'

const App = () => {
	return (
		<StrictMode>
			<ColorThemeStore>
				<Suspense fallback={null}>
					<Router />
				</Suspense>
			</ColorThemeStore>
		</StrictMode>
	)
}

export default App
