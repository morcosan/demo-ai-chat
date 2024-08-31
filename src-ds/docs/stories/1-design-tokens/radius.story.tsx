import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding.tsx'
import '@ds/docs/setup'
import { RADIUS_TOKENS } from '@ds/release'
import type { StoryObj } from '@storybook/react'

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
							<th className="w-full">Preview</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{RADIUS_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td>
									<pre>{token.name}</pre>
								</td>
								<td>
									<code>{token.value + String(token.unit)}</code>
								</td>
								<td>
									<div className="flex items-center gap-xs-9">
										<div
											className="h-sm-4 w-sm-4 border border-b-0 border-r-0 border-color-grey-5"
											style={{ borderRadius: `var(--ds-${token.name})` }}
										/>
										<div
											className="h-sm-4 w-sm-9 border border-b-0 border-r-0 border-color-grey-5"
											style={{ borderRadius: `var(--ds-${token.name})` }}
										/>
									</div>
								</td>
								<td>
									<DocsTokenCoding
										token={token}
										twVars={[`rounded-${token.name.replace('radius-', '')}`]}
										cssSize="w-lg-3"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</DocsPage>
		)
	},
}
