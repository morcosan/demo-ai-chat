import '@ds/release/styling/index.css'
import '@utils/release'
import { createRoot } from 'react-dom/client'
import App from './app'

LOG('BUILD_MODE:', ENV__BUILD_MODE)
LOG('BUILD_NUMBER:', ENV__BUILD_NUMBER)
LOG('DS_VERSION:', ENV__DS_VERSION)
LOG('ROOT_URL_PATH:', ENV__ROOT_URL_PATH)
LOG('USE_CSS_VARS:', ENV__USE_CSS_VARS)

createRoot(document.getElementById('root')!).render(<App />)
