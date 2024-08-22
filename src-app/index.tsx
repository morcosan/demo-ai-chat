import '@ds/release/setup' // Must be first

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app.tsx'
import './styles/index.css'

LOG('BUILD_MODE:', ENV__BUILD_MODE)
LOG('BUILD_TIME:', ENV__BUILD_TIME)
LOG('ROOT_URL_PATH:', ENV__ROOT_URL_PATH)

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>
)
