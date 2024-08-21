import '@ds/docs/setup'
import { SHADOW_TOKENS, Z_INDEX_TOKENS } from '@ds/release'
import type { StoryObj } from '@storybook/react'
import { DocsPage } from '../../components/docs-page'

export const story: StoryObj = {}
story.storyName = 'Elevation'

export default {
	id: 'Design tokens / Elevation',
	title: 'Design tokens / Elevation',

	component: () => {
		return (
			<DocsPage title="Elevation tokens">
				<table className="docs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
							<th>CSS variable</th>
							<th>Reference</th>
						</tr>
					</thead>
					<tbody>
						{SHADOW_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td className="flex items-center gap-xs-7">
									<div className="h-sm-8 w-sm-8" style={{ boxShadow: token.css }} />
									{token.name}
								</td>
								<td>{token.value}</td>
								<td>{token.css}</td>
								<td>{token.refName || '-'}</td>
							</tr>
						))}
					</tbody>
				</table>

				<table className="docs mt-md-0">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value (px)</th>
							<th>CSS variable</th>
							<th>Reference</th>
						</tr>
					</thead>
					<tbody>
						{Z_INDEX_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td>{token.name}</td>
								<td>{token.value}</td>
								<td>{token.css}</td>
								<td>{token.refName || '-'}</td>
							</tr>
						))}
					</tbody>
				</table>
			</DocsPage>
		)
	},
}
