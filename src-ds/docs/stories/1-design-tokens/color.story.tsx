import { DocsColorToken } from '@ds/docs/components/docs-color-token.tsx'
import { DocsHeader } from '@ds/docs/components/docs-header.tsx'
import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding.tsx'
import { DocsTokenThemeGrid } from '@ds/docs/components/docs-token-theme-grid.tsx'
import '@ds/docs/setup'
import { COLOR_TOKENS } from '@ds/release'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Color'

export default {
	id: 'Design tokens / Color',
	title: 'Design tokens / Color',

	component: () => {
		const primitiveTokens = COLOR_TOKENS.filter((token: DesignToken) => !token.ref)
		const semanticTokens = COLOR_TOKENS.filter((token: DesignToken) => token.ref)

		return (
			<DocsPage title="Color tokens">
				<DocsHeader>Semantic tokens</DocsHeader>
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
									<DocsTokenThemeGrid
										lightSlot={<pre>{(token.ref as TokenString).light}</pre>}
										darkSlot={<pre>{(token.ref as TokenString).dark}</pre>}
									/>
								</td>
								<td>
									<DocsTokenThemeGrid
										lightSlot={<DocsColorToken token={token} theme="light" />}
										darkSlot={<DocsColorToken token={token} theme="dark" />}
									/>
								</td>
								<td>
									<DocsTokenCoding
										token={token}
										twVars={[`bg-${token.name}`, `text-${token.name}`, `border-${token.name}`]}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<DocsHeader>Primitive tokens</DocsHeader>
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
									<DocsColorToken token={token} />
								</td>
								<td>
									<DocsTokenCoding
										token={token}
										twVars={[`bg-${token.name}`, `text-${token.name}`, `border-${token.name}`]}
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
