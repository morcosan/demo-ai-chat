import { DocIconItem, Icon } from '@ds/docs/components/docs-icon-item'
import { DocsPage } from '@ds/docs/components/docs-page.tsx'
import '@ds/docs/setup'
import type { StoryObj } from '@storybook/react'
import { camelCase, upperFirst } from 'lodash'
import { ComponentType } from 'react'

export const story: StoryObj = {}
story.storyName = 'Icons'

export default {
	id: 'Assets / Icons',
	title: 'Assets / Icons',

	component: () => {
		const files = import.meta.glob('@ds/release/assets/icons/*.svg', { eager: true, import: 'default' })

		const icons: Icon[] = Object.keys(files).map((path: string) => {
			const name = path.split('/').pop()!.replace('.svg', '')

			return {
				name,
				elem: files[path] as ComponentType,
				coding: `<${upperFirst(camelCase(name))}Svg className="" />`,
			}
		})

		return (
			<DocsPage
				title={
					<span>
						Icons <span className="align-middle text-size-md text-color-text-subtle">({icons.length})</span>
					</span>
				}
			>
				<div className="flex flex-wrap gap-xs-9">
					{icons.map((icon) => (
						<DocIconItem key={icon.name} icon={icon} />
					))}
				</div>
			</DocsPage>
		)
	},
}
