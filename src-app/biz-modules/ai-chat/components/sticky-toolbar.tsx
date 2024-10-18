import { useStickyHandler } from '@utils/release'

interface Props extends ReactProps {
	permanent?: boolean
}

export const StickyToolbar = ({ permanent, children, className, style }: Props) => {
	const { isSticky, stickyRef } = useStickyHandler()

	const stickyClass = cx('sticky top-0 z-sticky', className)
	const slotClass = cx(
		'bg-color-bg-default',
		(permanent || isSticky) && 'border-b border-color-border-shadow shadow-below-sm'
	)

	const slot = typeof children === 'function' ? children(isSticky) : children

	return (
		<div ref={stickyRef} className={stickyClass} style={style}>
			<div className={slotClass}>{slot}</div>
		</div>
	)
}
