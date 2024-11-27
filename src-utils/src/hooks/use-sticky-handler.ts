import { useEffect, useRef, useState } from 'react'

export const useStickyHandler = () => {
	const [isSticky, setIsSticky] = useState(false)
	const stickyRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const element = stickyRef.current
		if (!element) return

		const sentinel = document.createElement('div')
		element.parentElement?.insertBefore(sentinel, element)

		const options = { threshold: [0] }
		const observer = new IntersectionObserver(([entry]) => setIsSticky(!entry.isIntersecting), options)

		observer.observe(sentinel)

		return () => {
			observer.disconnect()
			sentinel.remove()
		}
	}, [])

	return {
		isSticky,
		stickyRef,
	}
}
