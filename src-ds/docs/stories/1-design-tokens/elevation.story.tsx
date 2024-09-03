import { DocsHeader } from '@ds/docs/components/docs-header.tsx'
import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding.tsx'
import { DocsTokenThemeGrid } from '@ds/docs/components/docs-token-theme-grid.tsx'
import '@ds/docs/setup'
import { SHADOW_TOKENS, Z_INDEX_TOKENS } from '@ds/release'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Elevation'

export default {
	id: 'Design tokens / Elevation',
	title: 'Design tokens / Elevation',

	component: () => {
		const primitiveTokens = Z_INDEX_TOKENS.filter((token: DesignToken) => !token.ref)
		const semanticTokens = Z_INDEX_TOKENS.filter((token: DesignToken) => token.ref)

		return (
			<DocsPage title="Elevation tokens">
				<DocsHeader>Shadow tokens</DocsHeader>
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
						{SHADOW_TOKENS.map((token: DesignToken) => (
							<tr key={token.name}>
								<td>
									<pre>{token.name}</pre>
								</td>
								<td>
									<DocsTokenThemeGrid
										lightSlot={<code>{(token.value as TokenValue).light}</code>}
										darkSlot={<code>{(token.value as TokenValue).dark}</code>}
									/>
								</td>
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
									<DocsTokenCoding token={token} twVars={[token.name]} cssSize="w-lg-2" />
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<DocsHeader>Z-Index semantic tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Name</th>
							<th>Reference</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{semanticTokens.map((token: DesignToken) => (
							<tr key={token.name}>
								<td>
									<pre>{token.name}</pre>
								</td>
								<td>
									<pre>{String(token.ref)}</pre>
								</td>
								<td>
									<code>{String(token.value)}</code>
								</td>
								<td>
									<DocsTokenCoding
										token={token}
										twVars={[`z-${token.name.replace('z-index-', '')}`]}
										cssSize="w-lg-2"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<DocsHeader>Z-Index primitive tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Name</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{primitiveTokens.map((token: DesignToken) => (
							<tr key={token.name}>
								<td>
									<pre>{token.name}</pre>
								</td>
								<td>
									<code>{String(token.value)}</code>
								</td>
								<td>
									<DocsTokenCoding
										token={token}
										twVars={[`z-${token.name.replace('z-index-', '')}`]}
										twSize="w-md-5"
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
