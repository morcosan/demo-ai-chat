import { CheckSvg, ChevronDownSvg, TextFieldSize, useUiTheme } from '@ds/release'
import { CSS__ABSOLUTE_OVERLAY, CSS_A11Y_OUTLINE_PROXY, Keyboard, useDefaults } from '@utils/release'
import { useCallback, useRef, useState } from 'react'

interface Props extends ReactProps {
	id: string
	value: unknown
	options: object[]
	keyLabel?: string
	keyValue?: string
	size?: TextFieldSize
	placeholder?: string
	ariaLabel?: string
	ariaDescription?: string
	disabled?: boolean
	readonly?: boolean
	invalid?: boolean
	compValue?: JsxFn<SelectOptionProps>
	compOption?: JsxFn<SelectOptionProps>
	onChange?(value: unknown): void
}

export interface SelectOptionProps {
	option: unknown
	selected?: boolean
}

export const SelectField = (rawProps: Props) => {
	const props = useDefaults(rawProps, {
		keyLabel: 'label',
		keyValue: 'value',
		size: 'md',
	})
	const { $color, $fontSize, $radius, $spacing, $shadow, $zIndex } = useUiTheme()
	const [isOpened, setIsOpened] = useState(false)
	const [search, setSearch] = useState('')
	const [optionIndex, setOptionIndex] = useState(-1)
	const inputRef = useRef<HTMLInputElement>(null)

	const isInteractive = !props.readonly && !props.disabled
	const keyLabel = props.keyLabel as string
	const keyValue = props.keyValue as string
	const keyword = search.trim().toLowerCase()
	const valueOption = (props.options.find((option: any) => option[keyValue] === props.value) as any) || null
	const options = props.options.filter((option: any) => option[keyLabel].toLowerCase().includes(keyword))

	const calcPadding: string = (() => {
		if (props.size === 'sm') return `calc((${$spacing['field-h-sm']} - ${$spacing['button-h-xs']}) / 2)`
		if (props.size === 'md') return `calc((${$spacing['field-h-md']} - ${$spacing['button-h-sm']}) / 2)`
		if (props.size === 'lg') return `calc((${$spacing['field-h-lg']} - ${$spacing['button-h-sm']}) / 2)`
		if (props.size === 'xl') return `calc((${$spacing['field-h-xl']} - ${$spacing['button-h-md']}) / 2)`
		return ''
	})()
	const calcPaddingTextX: string = (() => {
		if (props.size === 'sm') return $spacing['xs-2']
		if (props.size === 'md') return $spacing['xs-3']
		if (props.size === 'lg') return $spacing['xs-3']
		if (props.size === 'xl') return $spacing['xs-4']
		return ''
	})()
	const calcPaddingTextY: string = (() => {
		if (props.size === 'sm') return `calc(1.4 * ${calcPadding})`
		if (props.size === 'md') return `calc(2 * ${calcPadding})`
		if (props.size === 'lg') return `calc(1.5 * ${calcPadding})`
		if (props.size === 'xl') return `calc(2 * ${calcPadding})`
		return ''
	})()

	const calcHeight: string = (() => {
		if (props.size === 'sm') return $spacing['field-h-sm']
		if (props.size === 'md') return $spacing['field-h-md']
		if (props.size === 'lg') return $spacing['field-h-lg']
		if (props.size === 'xl') return $spacing['field-h-xl']
		return ''
	})()
	const cssHeight: CSS = { height: calcHeight }

	const cssRadius: CSS = (() => {
		if (props.size === 'sm') return { borderRadius: $radius['sm'] }
		if (props.size === 'md') return { borderRadius: $radius['sm'] }
		if (props.size === 'lg') return { borderRadius: $radius['md'] }
		if (props.size === 'xl') return { borderRadius: $radius['md'] }
		return {}
	})()

	const colorBorderDefault = props.readonly ? $color['border-subtle'] : $color['border-default']

	const cssA11yOutline: CSS = { '&:not(:has(input:focus))': { outline: 'none' } }

	const cssFieldFocus: CSS = {
		fill: $color['text-default'],
		stroke: $color['text-default'],
		borderColor: props.invalid ? $color['danger'] : $color['border-active'],
	}

	const cssFieldBase: CSS = {
		...CSS_A11Y_OUTLINE_PROXY,
		...cssA11yOutline,
		position: 'relative',
		borderWidth: '1px',
		borderColor: props.invalid ? $color['danger'] : colorBorderDefault,
		background: props.readonly ? 'transparent' : $color['bg-field'],
		opacity: props.disabled ? 0.3 : 1,
		color: $color['text-default'],
		fill: $color['text-placeholder'],
		stroke: $color['text-placeholder'],

		'&:hover': isInteractive ? { borderColor: props.invalid ? $color['danger'] : $color['border-hover'] } : {},

		'&:has(input:focus)': isInteractive ? cssFieldFocus : {},
	}

	const cssInput: CSS = {
		...cssRadius,

		'--ds-spacing-scrollbar-w': $spacing['xs-1'],
		width: '100%',
		height: '100%',
		minHeight: `calc(100% + 2 * ${calcPadding})`,
		maxHeight: `calc(100% + 2 * ${calcPadding})`,
		marginTop: `calc(-1 * ${calcPadding})`,
		marginBottom: `calc(-1 * ${calcPadding})`,
		padding: `${calcPaddingTextY} calc(${calcPaddingTextX} + ${calcPadding})`,
		paddingRight: calcHeight,
		background: 'transparent',
		color: $color['text-default'],
		fontSize: props.size === 'sm' ? $fontSize['sm'] : $fontSize['md'],
		opacity: isOpened ? (props.disabled ? 0.3 : 1) : 0,
		resize: 'none',

		'&:focus-visible': {
			outline: 'none',
		},
		'&::placeholder': {
			color: $color['text-placeholder'],
			opacity: 1,
		},
	}

	const cssArrow: CSS = {
		position: 'absolute',
		top: 0,
		right: 0,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: calcHeight,
		height: calcHeight,
		transform: isOpened ? 'rotate(180deg)' : 'rotate(0deg)',
		transition: 'transform 0.3s ease',
		pointerEvents: 'none',
	}

	const cssValueOption: CSS = {
		...CSS__ABSOLUTE_OVERLAY,
		padding: `${calcPaddingTextY} calc(${calcPaddingTextX} + ${calcPadding})`,
		paddingRight: calcHeight,
		opacity: isOpened ? 0 : 1,
		pointerEvents: 'none',
	}

	const calcExtraPadding = $spacing['xs-1']

	const cssOptionList: CSS = {
		position: 'absolute',
		top: `calc(${calcHeight} + 1px)`,
		left: `calc(-1 * ${calcExtraPadding})`,
		right: `calc(-1 * ${calcExtraPadding})`,
		display: isOpened ? 'block' : 'none',
		padding: `${$spacing['xs-3']} calc(${calcExtraPadding} / 2 + ${calcPadding})`,
		backgroundColor: $color['bg-card'],
		border: `1px solid ${$color['border-shadow']}`,
		borderRadius: $radius['sm'],
		boxShadow: $shadow['md'],
		zIndex: $zIndex['popup'],
	}
	const cssOption: CSS = {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		minHeight: $spacing['button-h-md'],
		padding: `${$spacing['xs-1']} calc(${calcExtraPadding} / 2 + ${calcPaddingTextX})`,
		borderRadius: $radius['sm'],
		cursor: 'pointer',
		overflow: 'hidden',

		'&:hover::before, &[data-current=true]::before': {
			...CSS__ABSOLUTE_OVERLAY,
			content: '""',
			backgroundColor: $color['hover-1'],
			zIndex: 1,
		},

		'&[aria-selected=true]': {
			backgroundColor: $color['secondary-bg'],
			color: $color['secondary-text-default'],
		},
	}
	const cssWrapper: CSS = {
		position: 'relative',
	}

	const openMenu = () => {
		setIsOpened(true)
		setSearch('')
		setOptionIndex(-1)
	}

	const onBlurInput = () => wait(100).then(() => setIsOpened(false)) // Delay is required to allow onClick

	const onSelectOption = (option: any) => {
		props.onChange?.(option[keyValue])
		inputRef.current?.focus()
		setIsOpened(false)
	}

	const onChangeInput = (event: ReactChangeEvent<HTMLInputElement>) => setSearch(event.target.value)

	const onKeyDown = useCallback(
		(event: ReactKeyboardEvent) => {
			const arrowFn = (diff: number) => {
				setOptionIndex((value: number) => ((value > -1 ? value : 0) + diff + options.length) % options.length)
			}
			const isArrowDown = event.key === Keyboard.ARROW_DOWN
			const isArrowUp = event.key === Keyboard.ARROW_UP
			const isTab = event.key === Keyboard.TAB
			const isSubmit = event.key === Keyboard.ENTER || event.key === Keyboard.SPACE

			if (isOpened) {
				if (isArrowDown) arrowFn(1)
				if (isArrowUp) arrowFn(-1)
				if (isSubmit && options[optionIndex] !== undefined) {
					onSelectOption(options[optionIndex])
					event.preventDefault()
				}
			} else {
				!isTab && openMenu()
			}
		},
		[options, optionIndex, isOpened]
	)

	return (
		<div css={cssWrapper}>
			<div css={[cssFieldBase, cssHeight, cssRadius, isOpened && cssFieldFocus]}>
				<input
					ref={inputRef}
					id={props.id}
					type="text"
					role="combobox"
					value={search}
					placeholder={props.placeholder}
					aria-label={props.ariaLabel}
					aria-describedby={`${props.id}-value`}
					aria-expanded={isOpened}
					aria-autocomplete="list"
					aria-haspopup="listbox"
					aria-activedescendant={optionIndex > -1 ? `${props.id}-option-${optionIndex}` : ''}
					css={cssInput}
					onFocus={openMenu}
					onBlur={onBlurInput}
					onChange={onChangeInput}
					onKeyDown={onKeyDown}
					onClick={() => !isOpened && openMenu()}
				/>

				<div id={`${props.id}-value`} css={cssValueOption}>
					<span className="sr-only">{t('aiChat.label.selectedValue')}</span>

					{props.compValue && valueOption ? (
						<props.compValue option={valueOption} selected />
					) : (
						valueOption?.[keyLabel] || ''
					)}

					<span className="sr-only">{props.ariaDescription}</span>
				</div>

				<div css={cssArrow}>
					<ChevronDownSvg className="h-xs-5" />
				</div>
			</div>

			<ul role="listbox" css={cssOptionList}>
				{options.map((option: any, index: number) => (
					<li
						key={option[keyValue]}
						id={`${props.id}-option-${index}`}
						role="option"
						aria-selected={option[keyValue] === props.value}
						data-current={index === optionIndex}
						css={cssOption}
						onClick={() => onSelectOption(option)}
					>
						<div className="flex-1">
							{props.compOption ? (
								<props.compOption option={option} selected={option[keyValue] === props.value} />
							) : (
								option[keyLabel]
							)}
						</div>

						{option[keyValue] === props.value && <CheckSvg className="h-xs-6" />}
					</li>
				))}

				{!options.length && <li css={cssOption}>{t('core.error.nothingFound', { search: search })}</li>}
			</ul>
		</div>
	)
}
