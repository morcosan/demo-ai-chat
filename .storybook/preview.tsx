import { UiA11yProvider, UiLibraryProvider, UiThemeProvider } from '@ds/release'
import { Preview } from '@storybook/react'
import { COOKIE__DS_COLOR_THEME, COOKIE__DS_UI_LIBRARY, Wrapper, Wrappers } from '@utils/release'
import { StrictMode, useMemo } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TOOLTIP__COLOR_THEME, TOOLTIP__UI_LIBRARY } from './_constants'

const preview: Preview = {
	parameters: {
		layout: 'centered',
	},

	globalTypes: {
		uiLibrary: {
			description: TOOLTIP__UI_LIBRARY,
			toolbar: {
				items: [
					{ value: 'custom', title: 'Custom', icon: 'markup' },
					{ value: 'material', title: 'Material UI', icon: 'markup' },
					{ value: 'antdesign', title: 'Ant Design', icon: 'markup' },
				],
				dynamicTitle: true,
			},
		},
		colorTheme: {
			description: TOOLTIP__COLOR_THEME,
			toolbar: {
				items: [
					{ value: 'light', title: 'Light', icon: 'sun' },
					{ value: 'dark', title: 'Dark', icon: 'moon' },
				],
				dynamicTitle: true,
			},
		},
	} satisfies StoryGlobalTypes,

	initialGlobals: {
		colorTheme: 'light',
		uiLibrary: 'custom',
	} satisfies StoryGlobals,

	decorators: [
		(Story, { globals }: { globals: StoryGlobals }) => {
			type Type = typeof UiA11yProvider | typeof UiThemeProvider | typeof UiLibraryProvider

			const providers = useMemo(
				(): Wrapper<Type>[] => [
					{ elem: UiA11yProvider },
					{ elem: UiThemeProvider, props: { cookieKey: COOKIE__DS_COLOR_THEME, colorTheme: globals.colorTheme } },
					// Must be last, it forces re-rendering
					{ elem: UiLibraryProvider, props: { cookieKey: COOKIE__DS_UI_LIBRARY, uiLibrary: globals.uiLibrary } },
				],
				[globals.colorTheme, globals.uiLibrary]
			)

			return (
				<StrictMode>
					<Wrappers wrappers={providers}>
						<MemoryRouter initialEntries={['/']}>
							<Story />
						</MemoryRouter>
					</Wrappers>
				</StrictMode>
			)
		},
	],
}
export default preview
