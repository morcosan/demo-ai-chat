import { useEffect, useRef, useState } from 'react'

interface Props extends ReactProps {
	variant: 'chat' | 'subchat'
}

export const StickyToolbar = ({ variant, children, className }: Props) => {
	const [isSticky, setIsSticky] = useState(false)
	const stickyRef = useRef<HTMLDivElement>(null)

	const stickyClass = cx(
		'sticky top-0 z-sticky border-color-border-shadow bg-color-bg-default',
		{ 'border-b shadow-below-sm': (variant === 'chat' && isSticky) || variant === 'subchat' },
		className
	)

	useEffect(() => {
		const element = stickyRef.current
		if (!element) return

		const sentinel = document.createElement('div')
		element.parentElement?.insertBefore(sentinel, element)

		const observer = new IntersectionObserver(([entry]) => setIsSticky(!entry.isIntersecting), {
			threshold: [0],
		})

		observer.observe(sentinel)

		return () => {
			observer.disconnect()
			sentinel.remove()
		}
	}, [])

	return (
		<div ref={stickyRef} className={stickyClass}>
			{children}
		</div>
	)
}
