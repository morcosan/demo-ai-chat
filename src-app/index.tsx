import '@ds/release/setup' // Must be first
import { createRoot } from 'react-dom/client'
import App from './app.tsx'

LOG('BUILD_MODE:', ENV__BUILD_MODE)
LOG('BUILD_NUMBER:', ENV__BUILD_NUMBER)
LOG('ROOT_URL_PATH:', ENV__ROOT_URL_PATH)

createRoot(document.getElementById('root')!).render(<App />)
