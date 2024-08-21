import '@ds/docs/setup'
import { COLOR_TOKENS } from '@ds/release'
import type { StoryObj } from '@storybook/react'
import { DocsPage } from '../../components/docs-page'

export const story: StoryObj = {}
story.storyName = 'Color'

export default {
	id: 'Design tokens / Color',
	title: 'Design tokens / Color',

	component: () => {
		return (
			<DocsPage title="Color tokens">
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
						{COLOR_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td className="flex items-center gap-xs-3">
									<div className="h-sm-1 w-sm-1" style={{ background: token.css }}></div>
									{token.name}
								</td>
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
