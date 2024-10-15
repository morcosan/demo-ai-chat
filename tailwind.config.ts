import { TAILWIND_THEME } from './src-ds/release/styling/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./{src-api,src-app,src-ds,src-i18n,src-utils}/**/*.{html,ts,tsx,js}'],
	theme: TAILWIND_THEME,
}
