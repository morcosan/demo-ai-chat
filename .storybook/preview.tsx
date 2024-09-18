import { UiA11yProvider, UiLibraryProvider, UiThemeProvider, Wrapper, Wrappers } from '@ds/release'
import { Preview } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

type Type = typeof UiA11yProvider | typeof UiThemeProvider | typeof UiLibraryProvider

const providers: Wrapper<Type>[] = [
	{ elem: UiA11yProvider },
	{ elem: UiThemeProvider, props: { cookieKey: 'ds-color-scheme' } },
	{ elem: UiLibraryProvider, props: { cookieKey: 'ds-ui-library' } }, // Must be last, it forces re-rendering
]

const preview: Preview = {
	decorators: [
		(Story) => (
			<Wrappers wrappers={providers}>
				<MemoryRouter initialEntries={['/']}>
					<Story />
				</MemoryRouter>
			</Wrappers>
		),
	],
}
export default preview

export const parameters = {
	layout: 'centered',
}
