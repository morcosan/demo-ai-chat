import i18n, { InitOptions } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LOCALE, LANGUAGES } from './languages'

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		// Dynamic loading
		resources: {},
		load: 'currentOnly',
		initImmediate: false,
		react: { useSuspense: false },

		// Language detection
		detection: {
			order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
			caches: ['localStorage'],
			lookupLocalStorage: 'app-lang',
			lookupQuerystring: 'lang',
		},
		supportedLngs: Object.keys(LANGUAGES),
		fallbackLng: DEFAULT_LOCALE,

		// Translation value
		interpolation: {
			escapeValue: false, // React already escapes by default
			prefix: '{',
			suffix: '}',
		},
	} satisfies InitOptions)

export const I18N_NS = 'translation'
export { i18n }
