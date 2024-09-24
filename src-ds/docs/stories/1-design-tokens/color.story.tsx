import { DocsColorToken } from '@ds/docs/components/docs-color-token.tsx'
import { DocsHeader } from '@ds/docs/components/docs-header.tsx'
import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding.tsx'
import { DocsTokenThemeGrid } from '@ds/docs/components/docs-token-theme-grid.tsx'
import '@ds/docs/setup'
import { getTokenValue_COLOR, TOKENS__COLOR } from '@ds/release'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Color'

export default {
	id: 'Design tokens / Color',
	title: 'Design tokens / Color',

	component: () => {
		type ColorKey = keyof typeof TOKENS__COLOR

		const primitiveTokens = Object.entries<DesignToken>(TOKENS__COLOR).filter(([, token]) => !token.$ref)
		const semanticTokens = Object.entries<DesignToken>(TOKENS__COLOR).filter(([, token]) => token.$ref)
		const DELAY = 1200

		return (
			<DocsPage title="Color tokens">
				<DocsHeader>Semantic tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Token</th>
							<th>Reference</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{semanticTokens.map(([name, token]) => (
							<tr key={name}>
								<td>
									<pre>{name}</pre>
								</td>
								<td>
									<DocsTokenThemeGrid
										lightSlot={<pre>{(token.$ref as DesignTokenThemeValue).light}</pre>}
										darkSlot={<pre>{(token.$ref as DesignTokenThemeValue).dark}</pre>}
									/>
								</td>
								<td>
									<DocsTokenThemeGrid
										lightSlot={<DocsColorToken value={getTokenValue_COLOR(name as ColorKey, 'light')} />}
										darkSlot={<DocsColorToken value={getTokenValue_COLOR(name as ColorKey, 'dark')} />}
									/>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$color['${name}']`}
										twVars={[`bg-color-${name}`, `text-color-${name}`, `border-color-${name}`]}
										cssVar={token.$css}
										delay={DELAY}
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
							<th>Token</th>
							<th className="w-full">Value</th>
							<th>Coding</th>
						</tr>
					</thead>
					<tbody>
						{primitiveTokens.map(([name, token]) => (
							<tr key={name}>
								<td>
									<pre>{name}</pre>
								</td>
								<td>
									<DocsColorToken value={getTokenValue_COLOR(name as ColorKey)} />
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$color['${name}']`}
										twVars={[`bg-color-${name}`, `text-color-${name}`, `border-color-${name}`]}
										cssVar={token.$css}
										delay={DELAY}
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
