export interface LogEntry {
	version: string
	date: string | null
	changes: {
		docs?: string[]
		token?: string[]
		asset?: string[]
		core?: string[]
		component?: string[]
		deprecate?: string[]
		breaking?: string[]
	}
}

export const CHANGELOG: LogEntry[] = [
	{
		version: 'v0.1.0',
		date: null,
		changes: {
			docs: ['Created basic Storybook docs for design tokens, web core and versioning'],
			token: ['Added basic tokens for ^color^, ^elevation^, ^radius^, ^spacing^ and ^typography^'],
			asset: ['Added 6 icons and 11 logos'],
			core: [
				'Added ^UiTheme^ system with ^light^ and ^dark^ themes',
				'Added ^UiLibrary^ system with ^Material UI^ and ^Ant Design^ libraries',
				'Added ^UiA11y^ system with ^default^ and ^pointer^ modes',
			],
			component: ['Created ^Button^ component'],
		},
	},
]
