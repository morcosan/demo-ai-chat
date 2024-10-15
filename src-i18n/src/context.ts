import { createContext } from 'react'
import { FLAG_SVGS } from './flags'
import { DEFAULT_LOCALE, Language, LANGUAGES, Locale } from './languages'

export interface Store {
	ActiveFlagSvg: JsxFn
	activeLanguage: Language
	activeLocale: Locale
	isLoaded: boolean
	isUpdating: boolean
	changeLocale(locale: Locale): Promise<void>
}

export const Context = createContext<Store>({
	ActiveFlagSvg: FLAG_SVGS[DEFAULT_LOCALE],
	activeLanguage: LANGUAGES[DEFAULT_LOCALE],
	activeLocale: DEFAULT_LOCALE,
	isLoaded: false,
	isUpdating: false,
	changeLocale: async () => {},
})
