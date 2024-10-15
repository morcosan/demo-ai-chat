import i18n, { InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { LANGUAGES } from './languages'
import enUS from './translations/en-US.json'
import plPL from './translations/pl-PL.json'
import roRO from './translations/ro-RO.json'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			'en-US': { translation: enUS },
			'pl-PL': { translation: plPL },
			'ro-RO': { translation: roRO },
		},
		fallbackLng: 'en-US',
		supportedLngs: Object.keys(LANGUAGES),
		detection: {
			order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
			lookupLocalStorage: 'app-lang',
			lookupQuerystring: 'lang',
		},
		interpolation: {
			escapeValue: false, // React already escapes by default
			prefix: '{',
			suffix: '}',
		},
	} satisfies InitOptions)

i18n.on('languageChanged', (lang: string) => (document.documentElement.lang = lang))

export { i18n }
