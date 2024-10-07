import { DocsHeader } from '@ds/docs/components/docs-header'
import { DocsPage } from '@ds/docs/components/docs-page'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding'
import '@ds/docs/setup'
import { TOKENS__FONT_SIZE, TOKENS__FONT_WEIGHT, TOKENS__LINE_HEIGHT } from '@ds/release'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Typography'

export default {
	id: 'Design tokens / Typography',
	title: 'Design tokens / Typography',

	component: () => {
		return (
			<DocsPage title="Typography tokens">
				<DocsHeader>Font size</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Token</th>
							<th>Value</th>
							<th className="w-full">Value (px)</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(TOKENS__FONT_SIZE).map(([name, token]) => (
							<tr key={name}>
								<td style={{ fontSize: `var(${token.$css})` }}>
									<pre>{name}</pre>
								</td>
								<td>
									<code>{token.$value}</code>
								</td>
								<td>
									<code>{Number(token.$value.replace('rem', '')) * 16}px</code>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$fontSize['${name}']`}
										tsSize="w-lg-2"
										twVars={[`text-size-${name}`]}
										twSize="w-lg-1"
										cssVar={token.$css}
										cssSize="w-lg-4"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<DocsHeader>Font weight</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Token</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(TOKENS__FONT_WEIGHT).map(([name, token]) => (
							<tr key={name}>
								<td style={{ fontWeight: `var(${token.$css})` }}>
									<pre>{name}</pre>
								</td>
								<td>
									<code>{token.$value}</code>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$fontWeight['${name}']`}
										tsSize="w-lg-2"
										twVars={[`font-weight-${name}`]}
										twSize="w-lg-1"
										cssVar={token.$css}
										cssSize="w-lg-4"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<DocsHeader>Line height</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Token</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(TOKENS__LINE_HEIGHT).map(([name, token]) => (
							<tr key={name}>
								<td style={{ lineHeight: `var(${token.$css})` }}>
									<pre className="border border-color-purple-2">{name}</pre>
								</td>
								<td>
									<code>{token.$value}</code>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$lineHeight['${name}']`}
										tsSize="w-lg-2"
										twVars={[`leading-${name}`]}
										twSize="w-lg-1"
										cssVar={token.$css}
										cssSize="w-lg-4"
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
