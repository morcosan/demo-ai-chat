import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding.tsx'
import '@ds/docs/setup'
import { TOKENS__RADIUS } from '@ds/release'
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
							<th>Token</th>
							<th>Value</th>
							<th className="w-full">Preview</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(TOKENS__RADIUS).map(([name, token]) => (
							<tr key={name}>
								<td>
									<pre>{name}</pre>
								</td>
								<td>
									<code>{token.$value}</code>
								</td>
								<td>
									<div className="flex items-center gap-xs-9">
										<div
											className="h-sm-4 w-sm-4 border-2 border-b-0 border-r-0 border-color-text-subtle"
											style={{ borderRadius: `var(${token.$css})` }}
										/>
										<div
											className="h-sm-4 w-md-0 border-2 border-b-0 border-r-0 border-color-text-subtle"
											style={{ borderRadius: `var(${token.$css})` }}
										/>
									</div>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$radius['${name}']`}
										tsSize="w-lg-1"
										twVars={[`rounded-${name}`]}
										cssVar={token.$css}
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
