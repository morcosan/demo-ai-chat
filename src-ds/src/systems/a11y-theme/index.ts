import { useContext } from 'react'
import { A11yThemeProvider, Context, Store } from './store.tsx'

export const useA11yThemeStore = () => useContext(Context)
export type A11yThemeStore = Store
export { A11yThemeProvider }
