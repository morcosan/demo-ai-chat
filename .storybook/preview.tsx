import { A11yThemeProvider, ColorThemeProvider } from '@ds/release'
import { Preview } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

const preview: Preview = {
	decorators: [
		(Story) => (
			<A11yThemeProvider>
				<ColorThemeProvider cookieKey="color-theme">
					<MemoryRouter initialEntries={['/']}>
						<Story />
					</MemoryRouter>
				</ColorThemeProvider>
			</A11yThemeProvider>
		),
	],
}
export default preview

export const parameters = {
	layout: 'centered',
}
