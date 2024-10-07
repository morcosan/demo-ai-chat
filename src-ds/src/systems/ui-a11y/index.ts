import { useContext } from 'react'
import { ATTR_KEY__A11Y_MODE, Context } from './_context'
import { UiA11yProvider } from './_provider'

export const useUiA11y = () => useContext(Context)
export { ATTR_KEY__A11Y_MODE, UiA11yProvider }

export const isA11yModeDefault = () => {
	return (document.documentElement.getAttribute(ATTR_KEY__A11Y_MODE) as A11yMode) === 'default'
}
export const isA11yModePointer = () => {
	return (document.documentElement.getAttribute(ATTR_KEY__A11Y_MODE) as A11yMode) === 'pointer'
}
