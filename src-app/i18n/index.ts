import { FLAG_SVGS, LANGUAGES, Locale } from '@app/i18n/_languages'
import i18n, { InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en_US from './translations/en_US.json'
import pl_PL from './translations/pl_PL.json'
import ro_RO from './translations/ro_RO.json'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en_US: { translation: en_US },
			pl_PL: { translation: pl_PL },
			ro_RO: { translation: ro_RO },
		},
		fallbackLng: 'en_US',
		supportedLngs: Object.keys(LANGUAGES),
		detection: {
			order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
		},
		interpolation: {
			escapeValue: false, // React already escapes by default
			prefix: '{',
			suffix: '}',
		},
	} satisfies InitOptions)

export const getActiveLocale = () => i18n.language as Locale
export const setActiveLocale = (locale: Locale) => i18n.changeLanguage(locale)
export const getActiveLanguage = () => LANGUAGES[i18n.language as Locale]
export const getActiveFlagSvg = () => FLAG_SVGS[i18n.language as Locale]
export * from './_languages'
