import { createTheme, darken, lighten, PaletteColorOptions } from '@mui/material'
import {
	getTokenValue_COLOR,
	getTokenValue_FONT_SIZE,
	getTokenValue_FONT_WEIGHT,
	getTokenValue_Z_INDEX,
} from '../tokens'

const createMuiColor = (color: string): PaletteColorOptions => {
	return {
		main: color,
		light: lighten(color, 0.2),
		dark: darken(color, 0.2),
	}
}

const createMuiTheme = (scheme: ColorScheme) => {
	return createTheme({
		palette: {
			mode: scheme,
			primary: createMuiColor(getTokenValue_COLOR('primary', scheme)),
			secondary: createMuiColor(getTokenValue_COLOR('secondary', scheme)),
			success: createMuiColor(getTokenValue_COLOR('success', scheme)),
			error: createMuiColor(getTokenValue_COLOR('danger', scheme)),
		},
		typography: {
			fontFamily: 'inherit',
			fontSize: Number(getTokenValue_FONT_SIZE('md').replace('rem', '')) * 16,
			fontWeightLight: getTokenValue_FONT_WEIGHT('xs'),
			fontWeightRegular: getTokenValue_FONT_WEIGHT('sm'),
			fontWeightMedium: getTokenValue_FONT_WEIGHT('md'),
			fontWeightBold: getTokenValue_FONT_WEIGHT('lg'),
		},
		zIndex: {
			mobileStepper: getTokenValue_Z_INDEX('sticky'),
			fab: getTokenValue_Z_INDEX('sticky') + 100,
			speedDial: getTokenValue_Z_INDEX('sticky') + 100,
			appBar: getTokenValue_Z_INDEX('sticky') + 200,
			drawer: getTokenValue_Z_INDEX('sticky') + 300,
			modal: getTokenValue_Z_INDEX('modal'),
			snackbar: getTokenValue_Z_INDEX('toast'),
			tooltip: getTokenValue_Z_INDEX('tooltip'),
		},
	})
}

export const MUI_LIGHT_THEME = createMuiTheme('light')
export const MUI_DARK_THEME = createMuiTheme('dark')
