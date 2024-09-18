import { useContext } from 'react'
import { ATTR_KEY__A11Y_MODE, Context } from './_context'
import { UiA11yProvider } from './_provider.tsx'

export const useUiA11y = () => useContext(Context)
export { ATTR_KEY__A11Y_MODE, UiA11yProvider }
