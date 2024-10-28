import { CheckSvg, MinusSvg, useUiTheme } from '@ds/release'
import { useEffect, useRef } from 'react'

interface Props extends ReactProps {
	checked?: boolean | null
	tooltip?: string
	ariaDescription?: string
	onChange?(checked: boolean): void
}

export const Checkbox = (props: Props) => {
	const { $color, $spacing, $radius } = useUiTheme()
	const inputRef = useRef<HTMLInputElement>(null)

	const isChecked = props.checked === true
	const isPartial = props.checked === null

	const cssWrapper: CSS = {
		position: 'relative',
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
		verticalAlign: 'middle',
		width: $spacing['button-h-sm'],
		height: $spacing['button-h-sm'],
		borderRadius: $radius['full'],
		userSelect: 'none',
		cursor: 'pointer',

		'& > span': {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '18px',
			height: '18px',
			borderWidth: '2px',
			borderStyle: 'solid',
			borderColor: isChecked || isPartial ? $color['primary'] : $color['border-hover'],
			backgroundColor: isChecked || isPartial ? $color['primary'] : 'transparent',
			borderRadius: $radius['xs'],
		},

		'&:hover, &:has(input:focus)': {
			backgroundColor: $color['hover-default'],

			'& > span': {
				borderColor: isChecked || isPartial ? $color['primary'] : $color['border-active'],
			},
		},
	}

	const cssInput: CSS = {
		position: 'absolute',
		top: '0',
		left: '0',
		width: '100%',
		height: '100%',
		borderRadius: $radius['full'],
		appearance: 'none',
		cursor: 'pointer',
	}

	const onChange = (event: ReactChangeEvent<HTMLInputElement>) => props.onChange?.(event.target.checked)

	useEffect(() => {
		inputRef.current && (inputRef.current.indeterminate = isPartial)
	}, [isPartial])

	return (
		<span css={cssWrapper} className={props.className} title={props.tooltip}>
			<input
				ref={inputRef}
				type="checkbox"
				checked={isChecked}
				aria-description={props.tooltip ? `${props.tooltip}, ${props.ariaDescription}` : props.ariaDescription}
				css={cssInput}
				onChange={onChange}
			/>

			<span>
				<CheckSvg className="h-xs-5 text-color-text-inverse" style={{ display: isChecked ? 'block' : 'none' }} />
				<MinusSvg className="h-xs-5 text-color-text-inverse" style={{ display: isPartial ? 'block' : 'none' }} />
			</span>
		</span>
	)
}
