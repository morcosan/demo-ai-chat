import { DocsHeader } from '@ds/docs/components/docs-header'
import { DocsPage } from '@ds/docs/components/docs-page'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding'
import '@ds/docs/setup'
import { TOKENS__BREAKPOINT } from '@ds/release'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Viewport'

export default {
	id: 'Design tokens / Viewport',
	title: 'Design tokens / Viewport',

	component: () => {
		return (
			<DocsPage title="Viewport tokens">
				<DocsHeader>Breakpoint tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Token</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(TOKENS__BREAKPOINT).map(([name, token]) => (
							<tr key={name}>
								<td style={{ fontSize: `var(${token.$css})` }}>
									<pre>{name}</pre>
								</td>
								<td>
									<code>{token.$value}</code>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$breakpoint['${name}']`}
										tsSize="w-lg-2"
										twVars={[`${name}:___`]}
										twSize="w-md-4"
										cssVar={token.$css}
										cssSize="w-lg-5"
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
