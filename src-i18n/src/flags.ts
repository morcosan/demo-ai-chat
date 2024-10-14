import { LANGUAGES, Locale } from './languages'

const ASSETS = import.meta.glob('./flags/*.svg', { eager: true }) as SvgGlobImport
const REGEX = /\/flags\/(.*)\.svg$/

type FlagSvgs = Record<Locale, JsxFn>

export const FLAG_SVGS: FlagSvgs = Object.keys(ASSETS).reduce(
	(acc, path) => {
		const flag = path.match(REGEX)?.[1] as string
		const entry = Object.entries(LANGUAGES).find(([, lang]) => lang.flag === flag)
		const locale = entry?.[0]

		return locale ? { ...acc, [locale]: ASSETS[path].default } : acc
	},
	Object.fromEntries(Object.keys(LANGUAGES).map((locale) => [locale, () => {}])) as unknown as FlagSvgs
)
