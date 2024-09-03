import { useA11yThemeStore } from '@ds/release'
import { HTMLAttributeAnchorTarget, MouseEvent, useMemo } from 'react'
import { Link } from 'react-router-dom'

export type ButtonVariant = 'solid-primary' | 'solid-secondary' | 'text-default' | 'text-inverse'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'
export type LinkType = 'new-tab' | 'same-tab' | 'inactive'

export interface ButtonProps extends ReactProps {
	variant: ButtonVariant
	size: ButtonSize
	square?: boolean
	expanded?: boolean
	loading?: boolean
	disabled?: boolean
	noHover?: boolean
	linkTo?: ReactTo
	linkHref?: string
	linkType?: LinkType

	onClick(event: MouseEvent): void
}

export const Button = (props: ButtonProps) => {
	const { isPointer } = useA11yThemeStore()

	/**
	 * State logic
	 */
	const isDisabled = useMemo(() => props.disabled || props.loading, [props.disabled, props.loading])

	/**
	 * CSS logic
	 */
	const baseButtonClass = [
		'relative z-0 before:absolute-overlay before:z-[-1]',
		'inline-flex items-center justify-center',
	].join(' ')
	const baseSpinnerClass = 'absolute-overlay flex-center pointer-events-none select-none'

	const disabledClass = useMemo(() => (isDisabled ? 'opacity-30 cursor-default' : ''), [isDisabled])

	const hoverClass = useMemo(
		() => (isDisabled || props.noHover ? '' : 'before:hover:bg-color-hover before:focus:bg-color-hover'),
		[isDisabled, props.noHover]
	)

	const widthClass = useMemo(() => (props.expanded ? 'w-full' : ''), [props.expanded])

	const variantClass = useMemo(() => {
		if (props.variant === 'solid-primary') return 'bg-color-primary text-color-text-inverse'
		if (props.variant === 'solid-secondary') return 'bg-color-secondary text-color-text-inverse'
		if (props.variant === 'text-default') return 'text-color-text-default'
		if (props.variant === 'text-inverse') return 'text-color-text-inverse'
		return ''
	}, [props.variant])

	const sizeClass = useMemo(() => {
		if (props.size === 'xs') return 'px-xs-4 h-button-xs text-size-xs'
		if (props.size === 'sm') return 'px-xs-6 h-button-sm text-size-sm'
		if (props.size === 'md') return 'px-xs-8 h-button-md text-size-md'
		if (props.size === 'lg') return 'px-sm-0 h-button-lg text-size-lg'
		return ''
	}, [props.size])

	const roundedClass = useMemo(() => {
		if (props.square) return ''
		if (props.size === 'xs') return 'rounded-sm before:rounded-sm'
		if (props.size === 'sm') return 'rounded-sm before:rounded-sm'
		if (props.size === 'md') return 'rounded-md before:rounded-md'
		if (props.size === 'lg') return 'rounded-lg before:rounded-lg'
		return ''
	}, [props.size, props.square])

	const classes = [variantClass, sizeClass, roundedClass]
	const classesButton = [baseButtonClass, ...classes, widthClass, hoverClass, disabledClass, props.className]
	const classesSpinner = [baseSpinnerClass, ...classes]

	const buttonClass = useMemo(() => classesButton.filter(Boolean).join(' '), classesButton)
	const spinnerClass = useMemo(() => classesSpinner.filter(Boolean).join(' '), classesSpinner)

	const childrenClass = useMemo(
		() => `pointer-events-none select-none ${props.loading ? 'opacity-0' : ''}`,
		[props.loading]
	)

	/**
	 * Link logic
	 */
	const linkTarget = useMemo((): HTMLAttributeAnchorTarget => {
		if (props.linkType === 'new-tab') return '_blank'
		if (props.linkType === 'same-tab') return '_top'
		return ''
	}, [props.linkType])

	/**
	 * Event logic
	 */
	const onClick = (event: MouseEvent) => {
		if (isDisabled || props.linkType === 'inactive') event.preventDefault()
		if (isDisabled) return

		if (isPointer) {
			const button = event.target as HTMLButtonElement
			button.blur()
		}

		props.onClick?.(event)
	}

	/**
	 * HTML logic
	 */
	const tabIndex = useMemo(() => (isDisabled ? -1 : 0), [isDisabled])

	const slot = useMemo(
		() => (
			<>
				<span className={childrenClass}>{props.children}</span>
				{Boolean(props.loading) && (
					<span className={spinnerClass}>
						<span className="animate-spin">⌛</span>
					</span>
				)}
			</>
		),
		[props.children, props.loading, spinnerClass]
	)

	return props.linkTo ? (
		<Link
			to={props.linkTo}
			target={linkTarget}
			tabIndex={tabIndex}
			className={buttonClass}
			style={props.style}
			onClick={onClick}
		>
			{slot}
		</Link>
	) : props.linkHref ? (
		<a
			href={props.linkHref}
			target={linkTarget}
			rel="noopener noreferrer"
			tabIndex={tabIndex}
			className={buttonClass}
			style={props.style}
			onClick={onClick}
		>
			{slot}
		</a>
	) : (
		<button type="button" disabled={isDisabled} className={buttonClass} style={props.style} onClick={onClick}>
			{slot}
		</button>
	)
}
