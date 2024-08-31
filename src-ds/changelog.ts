export interface LogEntry {
	version: string
	date: string | null
	changes: {
		docs?: string[]
		token?: string[]
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
			token: ['Added basic tokens for color, elevation, radius, spacing and typography'],
			core: [
				'Added ^Keyboard^ enum for keyboard keys',
				'Added color themes system with ^light^ and ^dark^ themes',
				'Added accessibility theme system with ^default^ and ^pointer^ themes',
			],
		},
	},
]
