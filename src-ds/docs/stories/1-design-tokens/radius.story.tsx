import '@ds/docs/setup'
import { RADIUS_TOKENS } from '@ds/release'
import type { StoryObj } from '@storybook/react'
import { DocsPage } from '../../components/docs-page'

export const story: StoryObj = {}
story.storyName = 'Radius'

export default {
	id: 'Design tokens / Radius',
	title: 'Design tokens / Radius',

	component: () => {
		return (
			<DocsPage title="Radius tokens">
				<table className="docs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value (px)</th>
							<th>CSS variable</th>
							<th>Reference</th>
						</tr>
					</thead>
					<tbody>
						{RADIUS_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td className="flex items-center gap-xs-3">
									<div
										className="h-sm-4 w-sm-4 border border-b-0 border-r-0 border-grey-5"
										style={{ borderRadius: token.css }}
									/>
									<div
										className="h-sm-4 w-sm-7 border border-b-0 border-r-0 border-grey-5"
										style={{ borderRadius: token.css }}
									/>
									{token.name}
								</td>
								<td>
									{token.value} {token.unit}
								</td>
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
