import { useContext } from 'react'
import { Context } from './_context'
import { UiViewportProvider } from './_provider'

export const useUiViewport = () => useContext(Context)
export { UiViewportProvider }
