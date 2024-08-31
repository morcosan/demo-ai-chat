import { useContext } from 'react'
import { ColorThemeProvider, Context, Store } from './store.tsx'

export const useColorThemeStore = () => useContext(Context)
export type ColorThemeStore = Store
export { ColorThemeProvider }
