import { CSS__ABSOLUTE_OVERLAY } from '@utils/release'
import { IconButtonProps } from '../_types'
import { useIconButtonBase } from './_base'

export const CustomImpl = (rawProps: IconButtonProps) => {
	const {
		cssBase,
		cssBgColor,
		cssHover,
		cssDisabled,
		cssPressed,
		cssRadius,
		cssSize,
		cssTextColor,
		isDisabled,
		props,
		baseBindings,
	} = useIconButtonBase(rawProps)

	const cssBgBase: CSS = {
		...CSS__ABSOLUTE_OVERLAY,
		zIndex: -2,
		pointerEvents: 'none',
	}

	const cssBgDisabled: CSS = props.loading ? { opacity: 0.3 } : {}

	const cssChildren: CSS = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		opacity: props.loading ? 0 : 1,
		pointerEvents: 'none',
		userSelect: 'none',
	}

	const bindings = {
		...baseBindings,
		css: [cssBase, cssTextColor, cssSize, cssPressed, cssRadius, cssHover, cssDisabled],
	}

	const slot = (
		<>
			<span css={[cssBgBase, cssBgColor, cssRadius, cssBgDisabled]} />
			<span css={cssChildren}>{props.children}</span>

			{Boolean(props.loading) && (
				<span className="absolute-overlay flex-center pointer-events-none select-none">
					<span className="animate-spin opacity-60">⌛</span>
				</span>
			)}
		</>
	)

	return props.linkHref ? (
		<a {...bindings}>{slot}</a>
	) : (
		<button type="button" disabled={isDisabled} {...bindings}>
			{slot}
		</button>
	)
}
