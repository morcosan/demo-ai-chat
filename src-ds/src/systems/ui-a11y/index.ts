import { useContext } from 'react'
import { Context } from './_context'
import { UiA11yProvider } from './_provider.tsx'

export const useUiA11y = () => useContext(Context)
export { UiA11yProvider }
