import { CSS__ABSOLUTE_OVERLAY } from '@utils/release'
import { useMemo } from 'react'
import { ButtonProps } from '../types'
import { useButtonBase } from './_base'

export const CustomImpl = (rawProps: ButtonProps) => {
	const {
		cssBase,
		cssBgColor,
		cssFont,
		cssHover,
		cssDisabled,
		cssPadding,
		cssPressed,
		cssRadius,
		cssSize,
		cssTextColor,
		isDisabled,
		isVItem,
		props,
		propsBase,
	} = useButtonBase(rawProps)

	const cssBgBase: CSS = {
		...CSS__ABSOLUTE_OVERLAY,
		zIndex: -2,
		pointerEvents: 'none',
	}

	const cssBgDisabled = useMemo((): CSS => {
		if (props.loading) return { opacity: 0.3 }
		return {}
	}, [props.loading])

	const cssChildren = useMemo(
		(): CSS => ({
			display: 'flex',
			alignItems: 'center',
			justifyContent: isVItem ? '' : 'center',
			width: '100%',
			height: '100%',
			opacity: props.loading ? 0 : 1,
			pointerEvents: 'none',
			userSelect: 'none',
		}),
		[isVItem, props.loading]
	)

	const propsButton = {
		...propsBase,
		css: [cssBase, cssTextColor, cssSize, cssPadding, cssPressed, cssRadius, cssFont, cssHover, cssDisabled],
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
		<a {...propsButton}>{slot}</a>
	) : (
		<button type="button" disabled={isDisabled} {...propsButton}>
			{slot}
		</button>
	)
}
