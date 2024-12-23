import { ThemeConfig } from 'antd'
import { getTokenValue_COLOR } from '../tokens'
import customCSS from './ant-design.css?raw'

const createThemeConfig = (theme: ColorTheme): ThemeConfig => ({
	hashed: false,
	token: {
		colorPrimary: getTokenValue_COLOR('primary-page-text', theme),
	},
})

export const ANT_LIGHT_THEME_CONFIG = createThemeConfig('light')
export const ANT_DARK_THEME_CONFIG = createThemeConfig('dark')

export const ANT_DESIGN_CSS = customCSS
