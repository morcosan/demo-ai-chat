import 'i18next'
import en_US from '../src/translations/en_US.json'

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'en_US'
		resources: {
			en_US: typeof en_US
		}
	}
}
