import { useRef, useState } from 'react'

export const useScrollable = () => {
	const [scrollHeight, setScrollHeight] = useState(0)
	const containerRef = useRef<HTMLDivElement>(null)

	const saveScrollPos = () => setScrollHeight(containerRef.current?.scrollHeight || 0)
	const scrollToSaved = () => containerRef.current?.scrollTo(0, containerRef.current.scrollHeight - scrollHeight)
	const scrollToBottom = () => containerRef.current?.scrollTo(0, containerRef.current.scrollHeight)
	const scrollToPos = () => {
		scrollHeight ? scrollToSaved() : scrollToBottom()
		setScrollHeight(0)
	}

	return {
		containerRef,
		saveScrollPos,
		scrollToPos,
	}
}
