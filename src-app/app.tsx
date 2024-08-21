import { Suspense } from 'react'
import { Router } from './routing'

const App = () => {
	return (
		<Suspense fallback={null}>
			<Router />
		</Suspense>
	)
}

export default App
