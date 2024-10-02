import { useEffect, useRef, useState } from 'react'

interface Props extends ReactProps {
	variant: 'chat' | 'subchat'
}

export const StickyToolbar = ({ variant, children, className }: Props) => {
	const [isSticky, setIsSticky] = useState(false)
	const stickyRef = useRef<HTMLDivElement>(null)

	const wrapperClass = (() => {
		if (variant === 'chat') return isSticky ? 'border-b border-color-border-shadow shadow-below-md' : ''
		if (variant === 'subchat') return 'border-b border-color-border-shadow shadow-below-sm'
		return ''
	})()

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
		<div ref={stickyRef} className={`sticky top-0 z-sticky bg-color-bg-default ${wrapperClass} ${className}`}>
			{children}
		</div>
	)
}