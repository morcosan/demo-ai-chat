import { createContext } from 'react'
import { FLAG_SVGS } from './flags'
import { DEFAULT_LOCALE, Language, LANGUAGES, Locale } from './languages'

export interface Store {
	loading: boolean
	ActiveFlagSvg: JsxFn
	activeLanguage: Language
	activeLocale: Locale
	changeLocale(locale: Locale): Promise<void>
}

export const Context = createContext<Store>({
	loading: false,
	ActiveFlagSvg: FLAG_SVGS[DEFAULT_LOCALE],
	activeLanguage: LANGUAGES[DEFAULT_LOCALE],
	activeLocale: DEFAULT_LOCALE,
	changeLocale: async () => {},
})
