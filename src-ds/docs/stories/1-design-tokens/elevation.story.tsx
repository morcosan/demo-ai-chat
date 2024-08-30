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
							<th>Preview</th>
							<th>Value</th>
							<th>CSS variable</th>
						</tr>
					</thead>
					<tbody>
						{SHADOW_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td>{token.name}</td>
								<td>
									<div className="flex items-center gap-xs-7">
										<div
											className="h-sm-8 w-sm-8"
											style={{ boxShadow: String((token.value as TokenValue).light) }}
										/>
										<div
											className="h-sm-8 w-sm-8"
											style={{ boxShadow: String((token.value as TokenValue).dark) }}
										/>
									</div>
								</td>
								<td>
									<div className="grid grid-cols-[40px_auto]">
										<div>Light:</div>
										<div>{(token.value as TokenValue).light}</div>
										<div>Dark:</div>
										<div>{(token.value as TokenValue).dark}</div>
									</div>
								</td>
								<td>{token.css}</td>
							</tr>
						))}
					</tbody>
				</table>

				<table className="docs mt-md-0">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
							<th>Reference</th>
							<th>CSS variable</th>
						</tr>
					</thead>
					<tbody>
						{Z_INDEX_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td>{token.name}</td>
								<td>{String(token.value)}</td>
								<td>{String(token.ref || '-')}</td>
								<td>{token.css}</td>
							</tr>
						))}
					</tbody>
				</table>
			</DocsPage>
		)
	},
}
