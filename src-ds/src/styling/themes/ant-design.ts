import { ThemeConfig } from 'antd'
import { getTokenValue_COLOR } from '../tokens'

const createAntdTheme = (scheme: ColorScheme): ThemeConfig => ({
	hashed: false,
	token: {
		colorPrimary: getTokenValue_COLOR('primary', scheme),
	},
})

export const ANTD_LIGHT_THEME = createAntdTheme('light')
export const ANTD_DARK_THEME = createAntdTheme('dark')
