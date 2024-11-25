import { useUiTheme } from '@ds/release'
import hljsCssDark from 'highlight.js/styles/a11y-dark.css?raw'
import hljsCssLight from 'highlight.js/styles/a11y-light.css?raw'
import './index.css'

export const AppStyling = ({ children }: ReactProps) => {
	const { isUiDark } = useUiTheme()

	const hljsCSS = isUiDark ? hljsCssDark : hljsCssLight

	return (
		<>
			<style>{hljsCSS}</style>
			{children}
		</>
	)
}
