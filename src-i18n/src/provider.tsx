import { FLAG_SVGS, I18N_NS } from '@i18n/release'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context, Store } from './context'
import { LANGUAGES, Locale } from './languages'

export const I18nProvider = ({ children }: ReactProps) => {
	const { i18n } = useTranslation()
	const [isUpdating, setIsUpdating] = useState(true)

	const isLocaleReady = (locale: Locale) => Boolean(i18n.getResourceBundle(locale, I18N_NS))

	const changeLocale = async (locale: Locale) => {
		if (!isLocaleReady(locale)) {
			setIsUpdating(true)

			try {
				const json = await import(`./translations/${locale}.json`)
				i18n.addResourceBundle(locale, I18N_NS, json, true, true)
			} catch (error) {
				setIsUpdating(false)
				return
			}

			setIsUpdating(false)
		}

		i18n.changeLanguage(locale)
		document.documentElement.lang = locale
	}

	useEffect(() => {
		// Use detected language
		changeLocale(i18n.language as Locale)
	}, [])

	const store: Store = useMemo(
		() => ({
			isUpdating,
			isLoaded: isLocaleReady(i18n.language as Locale),
			ActiveFlagSvg: FLAG_SVGS[i18n.language as Locale],
			activeLanguage: LANGUAGES[i18n.language as Locale],
			activeLocale: i18n.language as Locale,
			changeLocale,
		}),
		[i18n.language, isUpdating]
	)

	return <Context.Provider value={store}>{children}</Context.Provider>
}
