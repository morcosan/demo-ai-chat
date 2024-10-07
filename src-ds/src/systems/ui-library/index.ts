import { useContext } from 'react'
import { Context } from './_context'
import { UiLibraryProvider } from './_provider'

export const useUiLibrary = () => useContext(Context)
export { UiLibraryProvider }
