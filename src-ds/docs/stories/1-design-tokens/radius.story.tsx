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
							<th>Value</th>
							<th>Preview</th>
							<th>CSS variable</th>
						</tr>
					</thead>
					<tbody>
						{RADIUS_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td>{token.name}</td>
								<td>
									{String(token.value)} {token.unit}
								</td>
								<td>
									<div className="flex items-center gap-xs-3">
										<div
											className="h-sm-4 w-sm-4 border border-b-0 border-r-0 border-grey-5"
											style={{ borderRadius: token.css }}
										/>
										<div
											className="h-sm-4 w-sm-7 border border-b-0 border-r-0 border-grey-5"
											style={{ borderRadius: token.css }}
										/>
									</div>
								</td>

								<td>{token.css}</td>
							</tr>
						))}
					</tbody>
				</table>
			</DocsPage>
		)
	},
}
