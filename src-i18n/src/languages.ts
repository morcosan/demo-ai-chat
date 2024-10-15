export const LANGUAGES = {
	// Default
	en_US: { flag: 'us', name: 'English', nameEn: 'English', region: 'default' },
	uk_UA: { flag: 'ua', name: 'Українська', nameEn: 'Ukrainian', region: 'default' },
	ar_AE: { flag: 'ps', name: 'العربية', nameEn: 'Arabic', region: 'default' },

	// Europe
	bg_BG: { flag: 'bg', name: 'български', nameEn: 'Bulgarian', region: 'europe' },
	cs_CZ: { flag: 'cz', name: 'Čeština', nameEn: 'Czech', region: 'europe' },
	da_DK: { flag: 'dk', name: 'Dansk', nameEn: 'Danish', region: 'europe' },
	de_DE: { flag: 'de', name: 'Deutsch', nameEn: 'German', region: 'europe' },
	el_GR: { flag: 'gr', name: 'Ελληνικά', nameEn: 'Greek', region: 'europe' },
	es_ES: { flag: 'es', name: 'Español', nameEn: 'Spanish', region: 'europe' },
	et_EE: { flag: 'ee', name: 'Eesti', nameEn: 'Estonian', region: 'europe' },
	fi_FI: { flag: 'fi', name: 'Suomi', nameEn: 'Finnish', region: 'europe' },
	fr_FR: { flag: 'fr', name: 'Français', nameEn: 'French', region: 'europe' },
	hr_HR: { flag: 'hr', name: 'Hrvatski', nameEn: 'Croatian', region: 'europe' },
	hu_HU: { flag: 'hu', name: 'Magyar', nameEn: 'Hungarian', region: 'europe' },
	is_IS: { flag: 'is', name: 'Íslensk', nameEn: 'Icelandic', region: 'europe' },
	it_IT: { flag: 'it', name: 'Italiano', nameEn: 'Italian', region: 'europe' },
	lv_LV: { flag: 'lv', name: 'Latviski', nameEn: 'Latvian', region: 'europe' },
	nl_NL: { flag: 'nl', name: 'Nederlands', nameEn: 'Dutch', region: 'europe' },
	pl_PL: { flag: 'pl', name: 'Polski', nameEn: 'Polish', region: 'europe' },
	pt_PT: { flag: 'pt', name: 'Português', nameEn: 'Portuguese', region: 'europe' },
	ro_RO: { flag: 'ro', name: 'Română', nameEn: 'Romanian', region: 'europe' },
	sk_SK: { flag: 'sk', name: 'Slovenský', nameEn: 'Slovak', region: 'europe' },
	sl_SI: { flag: 'si', name: 'Slovenski', nameEn: 'Slovenian', region: 'europe' },
	sq_AL: { flag: 'al', name: 'Shqipërisht', nameEn: 'Albanian', region: 'europe' },
	sr_RS: { flag: 'rs', name: 'Српски', nameEn: 'Serbian', region: 'europe' },
	sv_SE: { flag: 'se', name: 'Svenska', nameEn: 'Swedish', region: 'europe' },

	// Asia
	az_AZ: { flag: 'az', name: 'Azərbaycanca', nameEn: 'Azerbaijani', region: 'asia' },
	fil_PH: { flag: 'ph', name: 'Filipino', nameEn: 'Filipino', region: 'asia' },
	hi_IN: { flag: 'in', name: 'हिन्दी', nameEn: 'Hindi', region: 'asia' },
	id_ID: { flag: 'id', name: 'Indonesia', nameEn: 'Indonesian', region: 'asia' },
	ja_JP: { flag: 'jp', name: '日本語', nameEn: 'Japanese', region: 'asia' },
	ka_GE: { flag: 'ge', name: 'ქართველი', nameEn: 'Georgian', region: 'asia' },
	kk_KZ: { flag: 'kz', name: 'Қазақ', nameEn: 'Kazakh', region: 'asia' },
	km_KH: { flag: 'kh', name: 'ខ្មែរ', nameEn: 'Khmer', region: 'asia' },
	ko_KR: { flag: 'kr', name: '한국어', nameEn: 'Korean', region: 'asia' },
	ms_MY: { flag: 'my', name: 'Melayu', nameEn: 'Malay', region: 'asia' },
	th_TH: { flag: 'th', name: 'ไทย', nameEn: 'Thai', region: 'asia' },
	tr_TR: { flag: 'tr', name: 'Türkçe', nameEn: 'Turkish', region: 'asia' },
	ur_PK: { flag: 'pk', name: 'اردو', nameEn: 'Urdu', region: 'asia' },
	uz_UZ: { flag: 'uz', name: "O'zbek", nameEn: 'Uzbek', region: 'asia' },
	vi_VN: { flag: 'vn', name: 'Việt', nameEn: 'Vietnamese', region: 'asia' },
	zh_CN: { flag: 'cn', name: '中国语訳', nameEn: 'Chinese', region: 'asia' },
} as const satisfies Record<string, Language>

export interface Language {
	flag: string
	name: string
	nameEn: string
	region: Region
}
export type Region = 'default' | 'europe' | 'asia' | 'africa' | 'america'
export type Locale = keyof typeof LANGUAGES