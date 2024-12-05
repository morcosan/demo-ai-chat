import { useStickyHandler } from '@utils/release'

interface Props extends ReactPropsExtended {
	permanent?: boolean
	stretched?: boolean
	bgClass?: string
}

export const StickyToolbar = ({ permanent, stretched, bgClass, children, className, style }: Props) => {
	const { isSticky, stickyRef } = useStickyHandler()

	const stickyClass = cx(
		'sticky z-sticky',
		stretched ? '-top-a11y-padding -mx-a11y-padding -mt-a11y-padding' : 'top-0',
		className
	)
	const slotClass = cx(
		bgClass || 'bg-color-bg-page',
		stretched && 'px-a11y-padding',
		(permanent || isSticky) && 'border-b border-color-border-shadow shadow-below-sm'
	)

	const slot = typeof children === 'function' ? children(isSticky) : children

	return (
		<div ref={stickyRef} className={stickyClass} style={style}>
			<div className={slotClass}>{slot}</div>
		</div>
	)
}
