import { theme } from './src-ds/release/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./{src-api,src-app,src-ds}/**/*.{html,ts,tsx}'],
	theme,
}
