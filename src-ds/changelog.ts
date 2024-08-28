export interface LogEntry {
	version: string
	date: string | null
	changes: {
		docs?: string[]
		token?: string[]
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
			docs: ['Created basic Storybook docs for tokens and changelog'],
			token: [
				'Added basic tokens for color, elevation, radius, spacing and typography',
				'Added support for multiple themes (^light^ and ^dark^)',
			],
		},
	},
]
