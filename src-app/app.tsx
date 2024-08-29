import { useAppTheme } from '@app/core-modules/app-theme'
import { StrictMode, Suspense, useEffect } from 'react'
import { Router } from './routing'
import './styles/index.css'

const App = () => {
	const { loadTheme } = useAppTheme()

	useEffect(() => {
		loadTheme()
	}, [])

	return (
		<StrictMode>
			<Suspense fallback={null}>
				<Router />
			</Suspense>
		</StrictMode>
	)
}

export default App
