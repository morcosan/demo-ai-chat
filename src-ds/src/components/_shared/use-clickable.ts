import { isA11yModePointer } from '@ds/release'
import { Keyboard } from '@utils/release'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkType } from './types'

export interface ClickableProps {
	loading?: boolean
	disabled?: boolean
	linkHref?: string
	linkType?: LinkType
	onClick?(event: ReactMouseEvent): void
}

export const useClickable = (props: ClickableProps) => {
	const navigate = useNavigate()
	const [isPressed, setIsPressed] = useState(false)

	const linkTarget = props.linkType === 'internal' ? '_self' : '_blank'
	const isNoop = props.disabled || props.loading

	const onClick = useCallback(
		(event: ReactMouseEvent) => {
			if (isNoop || props.linkType !== 'external') event.preventDefault()
			if (isNoop) return

			props.onClick?.(event)

			if (isA11yModePointer()) {
				const button = event.target as HTMLElement
				button.blur()
			}

			if (props.linkHref && props.linkType === 'internal') {
				navigate(props.linkHref)
			}
		},
		[isNoop, props.linkType, props.linkHref, props.onClick]
	)

	const onMouseDown = () => !isNoop && setIsPressed(true)
	const onMouseLeave = () => setIsPressed(false)
	const onMouseUp = () => setIsPressed(false)

	const onKeyDown = (event: ReactKeyboardEvent) => {
		if (isNoop) return
		if (event.key === Keyboard.SPACE || event.key === Keyboard.ENTER) {
			event.preventDefault()
			setIsPressed(true)
		}
	}

	const onKeyUp = (event: ReactKeyboardEvent) => {
		if (isNoop) return
		if (event.key === Keyboard.SPACE || event.key === Keyboard.ENTER) {
			const elem = event.target as HTMLButtonElement
			elem.click()
			setIsPressed(false)
		}
	}

	useEffect(() => {
		setIsPressed(false)
	}, [isNoop])

	const bindings = (() => {
		const bindings: any = {
			'aria-disabled': isNoop,
			onClick,
			onMouseDown,
			onMouseLeave,
			onMouseUp,
			onKeyDown,
			onKeyUp,
		}
		if (props.linkHref) {
			bindings.href = props.linkHref
			bindings.target = linkTarget
			bindings.rel = 'noopener noreferrer'
		}
		return bindings
	})()

	return {
		bindings,
		isNoop,
		isPressed,
		linkTarget,
		onClick,
		onKeyDown,
		onKeyUp,
		onMouseDown,
		onMouseLeave,
		onMouseUp,
	}
}
