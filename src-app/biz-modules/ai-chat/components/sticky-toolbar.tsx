import { useStickyHandler } from '@utils/release'

interface Props extends ReactProps {
	variant: 'chat' | 'subchat'
}

export const StickyToolbar = ({ variant, children, className }: Props) => {
	const { isSticky, stickyRef } = useStickyHandler()

	const stickyClass = cx(
		'sticky top-0 z-sticky border-color-border-shadow bg-color-bg-default',
		{ 'border-b shadow-below-sm': (variant === 'chat' && isSticky) || variant === 'subchat' },
		className
	)

	return (
		<div ref={stickyRef} className={stickyClass}>
			{children}
		</div>
	)
}
