import { useContext } from 'react'
import { Context } from './_context'
import { UiLibraryProvider } from './_provider.tsx'

export const useUiLibrary = () => useContext(Context)
export { UiLibraryProvider }
