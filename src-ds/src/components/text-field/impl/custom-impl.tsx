import { ChangeEvent, Ref, useCallback, useEffect } from 'react'
import { TextFieldProps, TextFieldRef } from '../_types'
import { InputElement, useTextFieldBase } from './_base'

export const CustomImpl = (rawProps: TextFieldProps, ref: Ref<TextFieldRef>) => {
	const { props, cssInput, cssWrapper, inputRef, onKeyDown } = useTextFieldBase(rawProps, ref)

	const onChange = useCallback(
		(event: ChangeEvent<InputElement>) => {
			props.onChange?.(event.target.value, event)
			updateInputHeight()
		},
		[props.minRows, props.maxRows, props.onChange]
	)

	useEffect(() => {
		if (props.multiline && inputRef.current) {
			inputRef.current.rows = props.minRows || 1
			updateInputHeight()
		}
	}, [props.value, props.minRows, props.maxRows])

	const updateInputHeight = () => {
		const elem = inputRef.current

		if (elem && props.multiline) {
			// Must set 'auto' to calculate real height
			elem.style.height = 'auto'
			// Calculate real height
			let height = elem.scrollHeight

			if (props.maxRows) {
				const minRows = props.minRows || 1
				const maxRows = props.maxRows > minRows ? props.maxRows : minRows
				const style = window.getComputedStyle(elem)
				const lineHeight = parseFloat(style.lineHeight)
				const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)
				const maxHeight = lineHeight * maxRows + paddingY
				height = Math.min(height, maxHeight)
			}

			// Set real height
			elem.style.height = height + 'px'
		}
	}

	const bindings = {
		id: props.id,
		value: props.value,
		placeholder: props.placeholder,
		'aria-label': props.ariaLabel,
		'aria-description': props.ariaDescription,
		maxLength: props.maxLength || undefined,
		readOnly: props.readonly,
		disabled: props.disabled,
		css: cssInput,
		onKeyDown,
		onChange,
	}

	return (
		<div css={cssWrapper} className={props.className} style={props.style}>
			{props.slotLeft}

			{props.multiline ? (
				<textarea ref={inputRef} rows={props.minRows} {...bindings} />
			) : (
				<input ref={inputRef} type="text" {...bindings} />
			)}

			{props.slotRight}
		</div>
	)
}
