import '@ds/docs/setup'
import { SPACING_TOKENS } from '@ds/release'
import type { StoryObj } from '@storybook/react'
import { Fragment } from 'react'
import { DocsPage } from '../../components/docs-page'

export const story: StoryObj = {}
story.storyName = 'Spacing'

export default {
	id: 'Design tokens / Spacing',
	title: 'Design tokens / Spacing',

	component: () => {
		return (
			<DocsPage title="Spacing tokens">
				<table className="docs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
							<th>CSS variable</th>
						</tr>
					</thead>
					<tbody>
						{SPACING_TOKENS.map((token: DesignToken) => (
							<Fragment key={token.name}>
								<tr key={token.name} className="!border-b-0">
									<td>{token.name}</td>
									<td>{String(token.value)} px</td>
									<td>{token.css}</td>
								</tr>
								<tr>
									<td colSpan={4} className="relative -top-xs-2 !py-0">
										<div className="h-xs-2 bg-grey-3" style={{ width: token.css }}></div>
									</td>
								</tr>
							</Fragment>
						))}
					</tbody>
				</table>
			</DocsPage>
		)
	},
}
