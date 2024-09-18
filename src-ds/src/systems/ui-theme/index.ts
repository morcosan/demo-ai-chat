import { useContext } from 'react'
import { Context } from './_context.ts'
import { UiThemeProvider } from './_provider.tsx'

export const useUiTheme = () => useContext(Context)
export { UiThemeProvider }
