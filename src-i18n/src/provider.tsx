import { AiChatSvg } from '@ds/release'
import { FLAG_SVGS, I18N_NS } from '@i18n/release'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Context, Store } from './context'
import { LANGUAGES, Locale } from './languages'

export const I18nProvider = ({ children }: ReactProps) => {
	const { i18n } = useTranslation()
	const [loading, setLoading] = useState(true)

	const hasJsonForLocale = (locale: Locale) => Boolean(i18n.getResourceBundle(locale, I18N_NS))

	const isReady = hasJsonForLocale(i18n.language as Locale)

	const fetchJsonFile = async (locale: Locale): Promise<boolean> => {
		if (hasJsonForLocale(locale)) return true

		setLoading(true)
		// await wait(15000)

		try {
			const json = await import(`./translations/${locale}.json`)
			i18n.addResourceBundle(locale, I18N_NS, json, true, true)
		} catch (error) {
			setLoading(false)
			return false
		}

		setLoading(false)
		return true
	}

	const setActiveLocale = async (locale: Locale) => {
		const success = await fetchJsonFile(locale)
		if (!success) return

		i18n.changeLanguage(locale)
		document.documentElement.lang = locale
	}

	useEffect(() => {
		setActiveLocale(i18n.language as Locale)
	}, [])

	const store: Store = useMemo(
		() => ({
			loading,
			ActiveFlagSvg: FLAG_SVGS[i18n.language as Locale],
			activeLanguage: LANGUAGES[i18n.language as Locale],
			activeLocale: i18n.language as Locale,
			changeLocale: setActiveLocale,
		}),
		[i18n.language, loading]
	)

	return (
		<Context.Provider value={store}>
			{children}

			<div className={cx('fixed-overlay z-tooltip bg-color-bg-default', isReady ? 'hidden' : 'flex-center')}>
				<AiChatSvg className="h-1/4 w-1/3 animate-pulse" />
			</div>
		</Context.Provider>
	)
}
