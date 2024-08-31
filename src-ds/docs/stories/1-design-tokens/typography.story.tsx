import { DocsHeader } from '@ds/docs/components/docs-header.tsx'
import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding.tsx'
import '@ds/docs/setup'
import { FONT_SIZE_TOKENS, FONT_WEIGHT_TOKENS, LINE_HEIGHT_TOKENS } from '@ds/release'
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
							<th>Name</th>
							<th>Value</th>
							<th className="w-full">Value (px)</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{FONT_SIZE_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td style={{ fontSize: `var(--ds-${token.name})` }}>
									<pre>{token.name}</pre>
								</td>
								<td>
									<code>{String(token.value)}rem</code>
								</td>
								<td>
									<code>{Number(token.value) * 16}px</code>
								</td>
								<td>
									<DocsTokenCoding
										token={token}
										twVars={[`text-${token.name.replace('font-', '')}`]}
										twSize="w-lg-1"
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
							<th>Name</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{FONT_WEIGHT_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td style={{ fontWeight: `var(--ds-${token.name})` }}>
									<pre>{token.name}</pre>
								</td>
								<td>
									<code>{String(token.value)}</code>
								</td>
								<td>
									<DocsTokenCoding
										token={token}
										twVars={[`font-${token.name.replace('font-', '')}`]}
										twSize="w-lg-1"
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
							<th>Name</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{LINE_HEIGHT_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td style={{ lineHeight: `var(--ds-${token.name})` }}>
									<pre className="border border-color-purple-2">{token.name}</pre>
								</td>
								<td>
									<code>{String(token.value)}em</code>
								</td>
								<td>
									<DocsTokenCoding
										token={token}
										twVars={[`leading-${token.name.replace('line-height-', '')}`]}
										twSize="w-lg-1"
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
