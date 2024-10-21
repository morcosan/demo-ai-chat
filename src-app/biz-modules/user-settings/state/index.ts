import { useContext } from 'react'
import { Context } from './_context'
import { SettingsProvider } from './_provider'

export const useSettings = () => useContext(Context)
export { SettingsProvider }
