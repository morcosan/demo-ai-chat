import { ReactNode } from 'react'
import { toggleControls } from '../utilities/storybook'

interface Props {
	title: string
	children: ReactNode
	type?: 'component' | 'default'
}

export const DocsPage = (props: Props) => {
	toggleControls(props.type === 'component')

	return (
		<div className="h-screen w-screen overflow-y-scroll p-sm-3">
			<h1 className="font-size-xl mb-md-0">{props.title}</h1>

			<div className="pb-md-0">{props.children}</div>
		</div>
	)
}
