import { useContext } from 'react'
import { Context, SettingsProvider } from './provider'

export const useSettings = () => useContext(Context)
export { SettingsProvider }
