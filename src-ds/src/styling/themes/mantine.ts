import { createTheme } from '@mantine/core'
import globalCSS from '@mantine/core/styles/global.css?raw'
import customCSS from './mantine.css?raw'

export const MANTINE_THEME = createTheme({})

export const MANTINE_CSS = globalCSS + '\n' + customCSS
