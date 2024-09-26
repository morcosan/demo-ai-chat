import { DocsPlaygroundProvider } from '@ds/docs/components/docs-playground-provider'
import { UiA11yProvider, UiLibraryProvider, UiThemeProvider } from '@ds/release'
import { Preview } from '@storybook/react'
import { COOKIE__DS_COLOR_THEME, COOKIE__DS_UI_LIBRARY, Wrapper, Wrappers } from '@utils/release'
import { StrictMode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { TOOLTIP__COLOR_THEME, TOOLTIP__PLAYGROUND_STYLE, TOOLTIP__UI_LIBRARY } from './_constants'

// Send ENV to custom scripts
if (window.parent !== window) {
	window.parent.__ENV__ = {
		BUILD_MODE: ENV__BUILD_MODE,
		BUILD_NUMBER: ENV__BUILD_NUMBER,
		DS_VERSION: ENV__DS_VERSION,
	}
}

const preview: Preview = {
	globalTypes: {
		playgroundStyle: {
			description: TOOLTIP__PLAYGROUND_STYLE,
			toolbar: {
				items: [
					{ value: 'grid', title: 'Grid', icon: 'photo' },
					{ value: 'tiles', title: 'Tiles', icon: 'photo' },
					{ value: 'blank', title: 'Blank', icon: 'photo' },
				],
				dynamicTitle: true,
			},
		},
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
		playgroundStyle: 'grid',
		colorTheme: 'light',
		uiLibrary: 'custom',
	} satisfies StoryGlobals,

	decorators: [
		(Story, { globals }: { globals: StoryGlobals }) => {
			type Type =
				| typeof DocsPlaygroundProvider
				| typeof UiA11yProvider
				| typeof UiLibraryProvider
				| typeof UiThemeProvider

			const providers: Wrapper<Type>[] = [
				{ elem: UiA11yProvider },
				{ elem: DocsPlaygroundProvider, props: { playgroundStyle: globals.playgroundStyle } },
				{ elem: UiThemeProvider, props: { cookieKey: COOKIE__DS_COLOR_THEME, colorTheme: globals.colorTheme } },
				// Must be last, it forces re-rendering
				{ elem: UiLibraryProvider, props: { cookieKey: COOKIE__DS_UI_LIBRARY, uiLibrary: globals.uiLibrary } },
			]

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
