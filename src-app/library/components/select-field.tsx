import { ChevronDownSvg, TextFieldSize, useUiTheme } from '@ds/release'
import { CSS_A11Y_OUTLINE_PROXY, useDefaults } from '@utils/release'
import { useState } from 'react'

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
	onChange?(value: unknown, event: ReactChangeEvent): void
}

export const SelectField = (rawProps: Props) => {
	const props = useDefaults(rawProps, {
		keyLabel: 'label',
		keyValue: 'value',
		size: 'md',
	})
	const { $color, $fontSize, $radius, $spacing } = useUiTheme()
	const [isOpened, setIsOpened] = useState(false)
	const [search, setSearch] = useState('')

	const keyword = search.trim().toLowerCase()

	const isInteractive = !props.readonly && !props.disabled

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

	const cssA11yOutline = { '&:not(:has(input:focus))': { outline: 'none' } }

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

		'&:has(input:focus)': isInteractive
			? {
					fill: $color['text-default'],
					stroke: $color['text-default'],
					borderColor: props.invalid ? $color['danger'] : $color['border-active'],
				}
			: {},
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
		padding: `${calcPaddingTextY} ${calcPaddingTextX}`,
		paddingRight: calcHeight,
		background: 'transparent',
		color: $color['text-default'],
		fontSize: props.size === 'sm' ? $fontSize['sm'] : $fontSize['md'],
		opacity: props.disabled ? 0.3 : 1,
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
	}

	const onChangeInput = (event: ReactChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	return (
		<div>
			<div css={[cssFieldBase, cssHeight, cssRadius]}>
				<input
					id={props.id}
					type="text"
					role="combobox"
					value={search}
					placeholder={props.placeholder}
					aria-label={props.ariaLabel}
					aria-description={props.ariaDescription}
					aria-expanded={isOpened}
					aria-controls="combobox-listbox"
					aria-autocomplete="list"
					aria-haspopup="listbox"
					css={cssInput}
					onFocus={() => setIsOpened(true)}
					onBlur={() => setIsOpened(false)}
					onChange={onChangeInput}
				/>

				<div css={cssArrow}>
					<ChevronDownSvg className="h-xs-5" />
				</div>
			</div>

			<ul role="listbox" className={cx(isOpened ? 'fixed' : 'hidden')}>
				{search}
			</ul>
		</div>
	)
}
