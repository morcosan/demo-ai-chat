import { ThemeConfig } from 'antd'
import { getTokenValue_COLOR } from '../tokens'

const createThemeConfig = (theme: ColorTheme): ThemeConfig => ({
	hashed: false,
	token: {
		colorPrimary: getTokenValue_COLOR('primary', theme),
	},
})

export const ANT_LIGHT_THEME_CONFIG = createThemeConfig('light')
export const ANT_DARK_THEME_CONFIG = createThemeConfig('dark')
