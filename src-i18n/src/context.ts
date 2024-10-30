import { createContext } from 'react'
import { FLAG_SVGS } from './flags'
import { DEFAULT_LOCALE, Language, LANGUAGES, Locale } from './languages'

export interface Store {
	ActiveFlagSvg: JsxFn
	activeLanguage: Language
	activeLocale: Locale
	isI18nLoaded: boolean
	isI18nUpdating: boolean
	changeLocale(locale: Locale): Promise<void>
}

export const Context = createContext<Store>({
	ActiveFlagSvg: FLAG_SVGS[DEFAULT_LOCALE],
	activeLanguage: LANGUAGES[DEFAULT_LOCALE],
	activeLocale: DEFAULT_LOCALE,
	isI18nLoaded: false,
	isI18nUpdating: false,
	changeLocale: async () => {},
})
