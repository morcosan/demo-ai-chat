import { i18n } from './src/config'
import { FLAG_SVGS } from './src/flags'
import { Language, LANGUAGES, Locale, Region } from './src/languages'

export * from './src/languages'

export { FLAG_SVGS, i18n, LANGUAGES }
export type { Language, Locale, Region }

export const getActiveLocale = () => i18n.language as Locale
export const setActiveLocale = (locale: Locale) => i18n.changeLanguage(locale)
export const getActiveLanguage = () => LANGUAGES[i18n.language as Locale]
export const getActiveFlagSvg = () => FLAG_SVGS[i18n.language as Locale]
