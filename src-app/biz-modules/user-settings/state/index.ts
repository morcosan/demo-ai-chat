import { useContext } from 'react'
import { Context, SettingsProvider } from './provider.tsx'

export const useSettings = () => useContext(Context)
export { SettingsProvider }
