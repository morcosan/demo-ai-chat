import { useStickyHandler } from '@utils/release'

interface Props extends ReactProps {
	permanent?: boolean
}

export const StickyToolbar = ({ permanent, children, className }: Props) => {
	const { isSticky, stickyRef } = useStickyHandler()

	const stickyClass = cx(
		'sticky top-0 z-sticky bg-color-bg-default',
		(permanent || isSticky) && 'border-b border-color-border-shadow shadow-below-sm',
		className
	)

	return (
		<div ref={stickyRef} className={stickyClass}>
			{children}
		</div>
	)
}
