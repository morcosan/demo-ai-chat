import { useContext } from 'react'
import { Context } from './store.tsx'

export const useColorThemeStore = () => useContext(Context)
