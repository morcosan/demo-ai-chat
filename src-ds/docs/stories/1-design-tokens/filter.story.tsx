import { DocsHeader } from '@ds/docs/components/docs-header'
import { DocsPage } from '@ds/docs/components/docs-page'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding'
import '@ds/docs/setup'
import { getTokenValue_BLUR, SettingsSvg, TOKENS__BLUR } from '@ds/release'
import type { StoryObj } from '@storybook/react'

export const story: StoryObj = {}
story.storyName = 'Filter'

export default {
	id: 'Design tokens / Filter',
	title: 'Design tokens / Filter',

	component: () => {
		type BlurKey = keyof typeof TOKENS__BLUR

		const primitiveTokens = Object.entries<DesignToken<string>>(TOKENS__BLUR).filter(([, token]) => !token.$ref)
		const semanticTokens = Object.entries<DesignToken<string>>(TOKENS__BLUR).filter(([, token]) => token.$ref)

		return (
			<DocsPage title="Filter tokens">
				<DocsHeader>Blur semantic tokens</DocsHeader>
				<table className="docs">
					<thead>
						<tr>
							<th>Token</th>
							<th>Reference</th>
							<th>Value</th>
							<th className="w-full">Preview</th>
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
									<pre>{token.$ref as string}</pre>
								</td>
								<td>
									<code>{getTokenValue_BLUR(token.$ref as BlurKey)}</code>
								</td>
								<td>
									<div className="flex gap-xs-4 text-size-lg" style={{ filter: `blur(var(${token.$css}))` }}>
										<SettingsSvg className="w-xs-7" />
										Blur example
									</div>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$blur['${name}']`}
										tsSize="w-lg-1"
										twVars={[`blur-${name}`]}
										twSize="w-lg-0"
										cssVar={token.$css}
										cssSize="w-lg-4"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<DocsHeader>Blur primitive tokens</DocsHeader>
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
						{primitiveTokens.map(([name, token]) => (
							<tr key={name}>
								<td>
									<pre>{name}</pre>
								</td>
								<td>
									<code>{token.$value}</code>
								</td>
								<td>
									<div className="flex gap-xs-4 text-size-lg" style={{ filter: `blur(var(${token.$css}))` }}>
										<SettingsSvg className="w-xs-7" />
										Blur example
									</div>
								</td>
								<td>
									<DocsTokenCoding
										tsVar={`$blur['${name}']`}
										tsSize="w-lg-1"
										twVars={[`blur-${name}`]}
										twSize="w-lg-0"
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
