import { LANGUAGES, Locale } from '@app/i18n/languages'
import i18n, { InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { ReactNode } from 'react'
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

const ASSETS = import.meta.glob('@app/library/assets/flags/*.svg', { eager: true }) as SvgGlobImport
const FLAGS = Object.keys(ASSETS).reduce((acc: Record<string, ReactNode>, path: string) => {
	const locale = path.match(/\/(.*)\.svg$/)?.[1]
	return locale && ASSETS[path] ? { ...acc, [locale]: ASSETS[path].default } : acc
}, {})

console.log(FLAGS)

export const getLocale = () => i18n.language
export const setLocale = (locale: Locale) => i18n.changeLanguage(locale)
export const getLanguage = () => LANGUAGES[i18n.language as Locale]
export const getFlag = (locale: Locale) => ''
export * from './languages'
