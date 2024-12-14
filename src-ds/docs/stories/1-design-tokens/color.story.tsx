import { DocsColorToken } from '@ds/docs/components/docs-color-token'
import { DocsHeader } from '@ds/docs/components/docs-header'
import { DocsPage } from '@ds/docs/components/docs-page'
import { DocsPlaygroundBase } from '@ds/docs/components/docs-playground-base'
import { DocsTokenCoding } from '@ds/docs/components/docs-token-coding'
import { DocsTokenThemeGrid } from '@ds/docs/components/docs-token-theme-grid'
import '@ds/docs/setup'
import { CssPrefix, getTokenValue_COLOR, TOKENS__COLOR } from '@ds/release'
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

		const purples = Object.keys(TOKENS__COLOR).filter((name: string) => /^purple-\d+$/.test(name))
		const yellows = Object.keys(TOKENS__COLOR).filter((name: string) => /^yellow-\d+$/.test(name))
		const reds = Object.keys(TOKENS__COLOR).filter((name: string) => /^red-\d+$/.test(name))
		const greens = Object.keys(TOKENS__COLOR).filter((name: string) => /^green-\d+$/.test(name))
		const greys = Object.keys(TOKENS__COLOR).filter((name: string) => /^grey-\d+$/.test(name))
		const blackGlasses = Object.keys(TOKENS__COLOR).filter((name: string) => /^black-glass-\d+$/.test(name))
		const whiteGlasses = Object.keys(TOKENS__COLOR).filter((name: string) => /^white-glass-\d+$/.test(name))

		const colorSlotFn = (colors: string[]) => {
			return (
				<div className="flex flex-wrap gap-px">
					{colors.map((color) => (
						<div
							key={color}
							className="flex h-md-0 min-w-fit flex-1 items-start justify-start whitespace-nowrap text-size-xs"
							style={{ background: `var(${CssPrefix.COLOR}${color})` }}
						>
							<div className="rounded-xs bg-color-white-glass-7 px-xs-1 pb-xs-0 text-color-black">{color}</div>
						</div>
					))}
				</div>
			)
		}

		return (
			<DocsPage title="Color tokens">
				<DocsHeader>Color palette</DocsHeader>
				<DocsPlaygroundBase className="flex flex-col gap-xs-6 p-xs-9">
					{colorSlotFn(purples)}
					{colorSlotFn(yellows)}
					{colorSlotFn(reds)}
					{colorSlotFn(greens)}
					{colorSlotFn(greys)}
					{colorSlotFn(blackGlasses)}
					{colorSlotFn(whiteGlasses)}
				</DocsPlaygroundBase>

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
										cssVar={`${CssPrefix.COLOR}${name}`}
										tsSize="w-md-7"
										twSize="w-md-7"
										cssSize="w-md-7"
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
						{primitiveTokens.map(([name]) => (
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
										cssVar={`${CssPrefix.COLOR}${name}`}
										tsSize="w-md-7"
										twSize="w-md-7"
										cssSize="w-md-7"
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
