import { useContext } from 'react'
import { ATTR_KEY__COLOR_THEME } from './_constants'
import { Context } from './_context'
import { UiThemeProvider } from './_provider'

export const useUiTheme = () => useContext(Context)
export { ATTR_KEY__COLOR_THEME, UiThemeProvider }
