// noinspection DuplicatedCode

import { ButtonProps } from '../_types'
import { useBaseImpl } from './_base-impl'

export const CustomImpl = (rawProps: ButtonProps) => {
	const { bindings, cssChildren, props } = useBaseImpl(rawProps)

	const slot = (
		<>
			<span css={cssChildren}>{props.children}</span>

			{Boolean(props.loading) && (
				<span className="absolute-overlay flex-center pointer-events-none select-none">
					<span className="animate-spin">⌛</span>
				</span>
			)}
		</>
	)

	return props.linkHref ? (
		<a {...bindings}>{slot}</a>
	) : (
		<button type="button" {...bindings}>
			{slot}
		</button>
	)
}
