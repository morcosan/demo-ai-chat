import { useEffect, useRef, useState } from 'react'

interface Props extends ReactProps {
	size: 'sm' | 'md'
}

export const StickyToolbar = ({ size, children, className }: Props) => {
	const [isSticky, setIsSticky] = useState(false)
	const stickyRef = useRef<HTMLDivElement>(null)

	const shadowClass = isSticky ? (size === 'sm' ? 'shadow-below-sm' : 'shadow-below-md') : ''

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
		<div ref={stickyRef} className={`sticky top-0 z-sticky bg-color-bg-default ${shadowClass} ${className}`}>
			{children}
		</div>
	)
}
