import { FLAG_SVGS, LANGUAGES, Locale } from '@app/i18n/languages'
import i18n, { InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en_US',
		supportedLngs: Object.keys(LANGUAGES),
		detection: {
			order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
		},
		interpolation: {
			escapeValue: false,
		},
	} satisfies InitOptions)

export const getLocale = () => i18n.language
export const setLocale = (locale: Locale) => i18n.changeLanguage(locale)
export const getActiveLanguage = () => LANGUAGES[i18n.language as Locale]
export const getActiveFlagSvg = () => FLAG_SVGS[i18n.language as Locale]
export * from './languages'
