export const LANGUAGES = {
	// Default
	'en-US': { flag: 'us', name: 'English', nameEn: 'English', region: 'default' },
	'uk-UA': { flag: 'ua', name: 'Українська', nameEn: 'Ukrainian', region: 'default' },
	'ar-AE': { flag: 'ps', name: 'العربية', nameEn: 'Arabic', region: 'default' },

	// Europe
	'bg-BG': { flag: 'bg', name: 'български', nameEn: 'Bulgarian', region: 'europe' },
	'cs-CZ': { flag: 'cz', name: 'Čeština', nameEn: 'Czech', region: 'europe' },
	'da-DK': { flag: 'dk', name: 'Dansk', nameEn: 'Danish', region: 'europe' },
	'de-DE': { flag: 'de', name: 'Deutsch', nameEn: 'German', region: 'europe' },
	'el-GR': { flag: 'gr', name: 'Ελληνικά', nameEn: 'Greek', region: 'europe' },
	'es-ES': { flag: 'es', name: 'Español', nameEn: 'Spanish', region: 'europe' },
	'et-EE': { flag: 'ee', name: 'Eesti', nameEn: 'Estonian', region: 'europe' },
	'fi-FI': { flag: 'fi', name: 'Suomi', nameEn: 'Finnish', region: 'europe' },
	'fr-FR': { flag: 'fr', name: 'Français', nameEn: 'French', region: 'europe' },
	'hr-HR': { flag: 'hr', name: 'Hrvatski', nameEn: 'Croatian', region: 'europe' },
	'hu-HU': { flag: 'hu', name: 'Magyar', nameEn: 'Hungarian', region: 'europe' },
	'is-IS': { flag: 'is', name: 'Íslensk', nameEn: 'Icelandic', region: 'europe' },
	'it-IT': { flag: 'it', name: 'Italiano', nameEn: 'Italian', region: 'europe' },
	'lv-LV': { flag: 'lv', name: 'Latviski', nameEn: 'Latvian', region: 'europe' },
	'nl-NL': { flag: 'nl', name: 'Nederlands', nameEn: 'Dutch', region: 'europe' },
	'pl-PL': { flag: 'pl', name: 'Polski', nameEn: 'Polish', region: 'europe' },
	'pt-PT': { flag: 'pt', name: 'Português', nameEn: 'Portuguese', region: 'europe' },
	'ro-RO': { flag: 'ro', name: 'Română', nameEn: 'Romanian', region: 'europe' },
	'sk-SK': { flag: 'sk', name: 'Slovenský', nameEn: 'Slovak', region: 'europe' },
	'sl-SI': { flag: 'si', name: 'Slovenski', nameEn: 'Slovenian', region: 'europe' },
	'sq-AL': { flag: 'al', name: 'Shqipërisht', nameEn: 'Albanian', region: 'europe' },
	'sr-RS': { flag: 'rs', name: 'Српски', nameEn: 'Serbian', region: 'europe' },
	'sv-SE': { flag: 'se', name: 'Svenska', nameEn: 'Swedish', region: 'europe' },

	// Asia
	'az-AZ': { flag: 'az', name: 'Azərbaycanca', nameEn: 'Azerbaijani', region: 'asia' },
	'fil-PH': { flag: 'ph', name: 'Filipino', nameEn: 'Filipino', region: 'asia' },
	'hi-IN': { flag: 'in', name: 'हिन्दी', nameEn: 'Hindi', region: 'asia' },
	'id-ID': { flag: 'id', name: 'Indonesia', nameEn: 'Indonesian', region: 'asia' },
	'ja-JP': { flag: 'jp', name: '日本語', nameEn: 'Japanese', region: 'asia' },
	'ka-GE': { flag: 'ge', name: 'ქართველი', nameEn: 'Georgian', region: 'asia' },
	'kk-KZ': { flag: 'kz', name: 'Қазақ', nameEn: 'Kazakh', region: 'asia' },
	'km-KH': { flag: 'kh', name: 'ខ្មែរ', nameEn: 'Khmer', region: 'asia' },
	'ko-KR': { flag: 'kr', name: '한국어', nameEn: 'Korean', region: 'asia' },
	'ms-MY': { flag: 'my', name: 'Melayu', nameEn: 'Malay', region: 'asia' },
	'th-TH': { flag: 'th', name: 'ไทย', nameEn: 'Thai', region: 'asia' },
	'tr-TR': { flag: 'tr', name: 'Türkçe', nameEn: 'Turkish', region: 'asia' },
	'ur-PK': { flag: 'pk', name: 'اردو', nameEn: 'Urdu', region: 'asia' },
	'uz-UZ': { flag: 'uz', name: "O'zbek", nameEn: 'Uzbek', region: 'asia' },
	'vi-VN': { flag: 'vn', name: 'Việt', nameEn: 'Vietnamese', region: 'asia' },
	'zh-CN': { flag: 'cn', name: '中国语訳', nameEn: 'Chinese', region: 'asia' },
} as const satisfies Record<string, Language>

export interface Language {
	flag: string
	name: string
	nameEn: string
	region: Region
}
export type Region = 'default' | 'europe' | 'asia' | 'africa' | 'america'
export type Locale = keyof typeof LANGUAGES
