import { DocsHeader } from '@ds/docs/components/docs-header.tsx'
import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import '@ds/docs/setup'
import { renderHtml } from '@ds/docs/utilities/docs.ts'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Systems'

interface System {
	name: string
	hook: string
	type: string
	provider: string
	details: string
}

interface Attribute {
	code: string
	details: string
}

export default {
	id: 'Web core / Systems',
	title: 'Web core / Systems',

	component: () => {
		const systems = [
			{
				name: 'A11y theme',
				hook: 'useA11yThemeStore',
				type: 'A11yThemeStore',
				provider: 'A11yThemeProvider',
				details: 'System responsible with changing accessibility theme for keyboard navigation',
			},
			{
				name: 'Color theme',
				hook: 'useColorThemeStore',
				type: 'ColorThemeStore',
				provider: 'ColorThemeProvider',
				details: 'System responsible with changing color theme',
			},
		]
		const attributes = [
			{ code: '[data-color-theme="light"]', details: 'Display ^light^ color theme' },
			{ code: '[data-color-theme="dark"]', details: 'Display ^dark^ color theme' },
			{ code: '[data-a11y-theme="default"]', details: 'Show tab navigation outline' },
			{ code: '[data-a11y-theme="pointer"]', details: 'Hide tab navigation outline' },
		]

		return (
			<DocsPage title="Systems">
				<DocsHeader>Web systems</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>System</th>
							<th>Store hook</th>
							<th>Store type</th>
							<th>Store provider</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{systems.map((system: System) => (
							<tr key={system.name}>
								<td>{system.name}</td>
								<td>
									<code>{system.hook}</code>
								</td>
								<td>
									<code>{system.type}</code>
								</td>
								<td>
									<code>{system.provider}</code>
								</td>
								<td dangerouslySetInnerHTML={{ __html: renderHtml(system.details) }} />
							</tr>
						))}
					</tbody>
				</table>

				<DocsHeader>Web attributes</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Attribute</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{attributes.map((attribute: Attribute) => (
							<tr key={attribute.code}>
								<td>
									<code>{attribute.code}</code>
								</td>
								<td dangerouslySetInnerHTML={{ __html: renderHtml(attribute.details) }} />
							</tr>
						))}
					</tbody>
				</table>
			</DocsPage>
		)
	},
}
