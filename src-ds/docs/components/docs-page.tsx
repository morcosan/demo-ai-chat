import { toggleControls } from '../utilities/storybook'

interface Props extends ReactProps {
	title: string
	type?: 'component' | 'default'
}

export const DocsPage = (props: Props) => {
	toggleControls(props.type === 'component')

	return (
		<div className="h-screen w-screen overflow-x-hidden overflow-y-scroll p-sm-3">
			<h1 className="mb-md-0 text-size-xxl">{props.title}</h1>

			<div className="pb-md-0">{props.children}</div>
		</div>
	)
}
