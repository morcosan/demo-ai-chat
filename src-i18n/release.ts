import { useContext } from 'react'
import { Context } from './src/context'

export * from './src/config'
export * from './src/flags'
export * from './src/languages'
export * from './src/provider'

export const useI18n = () => useContext(Context)
