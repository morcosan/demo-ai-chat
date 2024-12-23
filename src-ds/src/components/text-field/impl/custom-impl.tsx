import { useCallback, useEffect, useImperativeHandle } from 'react'
import { TextFieldProps } from '../_types'
import { InputElement, useBaseImpl } from './_base-impl'

export const CustomImpl = (rawProps: TextFieldProps) => {
	const base = useBaseImpl(rawProps)
	const { cssInput, cssPrefix, cssRoot, cssSuffix, inputBindings, inputRef, methods, props, onKeyDown } = base

	const onChange = useCallback(
		(event: ReactChangeEvent<InputElement>) => {
			props.onChange?.(event.target.value, event)
			updateInputHeight()
		},
		[props.minRows, props.maxRows, props.onChange]
	)

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
				const minHeight = lineHeight + paddingY
				height = Math.min(Math.max(height, minHeight), maxHeight)
			}

			// Set real height
			elem.style.height = height + 'px'
		}
	}

	useEffect(() => {
		if (props.multiline && inputRef.current) {
			inputRef.current.rows = props.minRows || 1
			updateInputHeight()
		}
	}, [props.minRows, props.maxRows])

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.value = props.value || ''
			props.multiline && updateInputHeight()
		}
	}, [props.value])

	useImperativeHandle(props.ref, () => ({
		...methods,
		setValue: (value: string) => {
			inputRef.current && (inputRef.current.value = value || '')
			updateInputHeight()
		},
	}))

	const bindings = {
		...inputBindings,
		ref: inputRef,
		id: props.id,
		css: cssInput,
		onFocus: props.onFocus,
		onBlur: props.onBlur,
		onKeyDown: onKeyDown,
		onChange: onChange,
	}

	return (
		<div css={cssRoot} className={props.className}>
			{Boolean(props.prefix) && <div css={cssPrefix}>{props.prefix}</div>}

			{props.multiline ? <textarea rows={props.minRows} {...bindings} /> : <input type="text" {...bindings} />}

			{Boolean(props.suffix) && <div css={cssSuffix}>{props.suffix}</div>}
		</div>
	)
}
