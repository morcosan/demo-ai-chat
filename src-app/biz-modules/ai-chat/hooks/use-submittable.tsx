import { useUiViewport } from '@ds/release'
import { useCallback } from 'react'

export const useSubmittable = (submitFn: Function, deps: unknown[]) => {
	const { isViewportMaxLG } = useUiViewport()

	return useCallback((event: ReactKeyboardEvent) => {
		if (isViewportMaxLG) return // Disable submit when pressing Enter on mobile
		if (event.shiftKey) return // Allow new lines only with Shift+Enter on desktop

		event.preventDefault()
		submitFn()
	}, deps)
}
