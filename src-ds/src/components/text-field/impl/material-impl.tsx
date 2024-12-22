import TextField from '@mui/material/TextField'
import { useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { TextFieldProps } from '../_types'
import { InputElement, useBaseImpl } from './_base-impl'

export const MaterialImpl = (rawProps: TextFieldProps) => {
	const b = useBaseImpl(rawProps)
	const { cssInput, cssPrefix, cssRoot, cssSuffix, inputRef, inputBindings, methods, props, tokens, onKeyDown } = b
	const [value, setValue] = useState(props.value)

	// Manually compute textarea height (MUI bug?)
	const cssInputHeight: CSS = (() => {
		if (props.multiline) {
			const lineCount = (value || props.placeholder || '').split('\n').length
			const minRows = props.minRows || 1
			const textPY = tokens.textPaddingY
			const height = `calc((${tokens.minHeight} - 2 * ${textPY}) * ${minRows} + 2 * ${textPY})`

			if (lineCount <= minRows) {
				return { height: `${height} !important` }
			}
		}
		return {}
	})()

	const cssMaterial: CSS = {
		'& .MuiInputBase-root': {
			...cssRoot,
			padding: 'unset',
			fontSize: 'unset',
		},
		'& fieldset': { display: 'none' },

		'& .MuiInputBase-input': {
			...cssInput,
			...cssInputHeight,
			boxSizing: 'border-box',
			minHeight: tokens.minHeight,
		},
	}

	const onChange = useCallback(
		(event: ReactChangeEvent<InputElement>) => {
			setValue(event.target.value)
			props.onChange?.(event.target.value, event)
		},
		[props.multiline, props.onChange]
	)

	useEffect(() => {
		setValue(props.value)
	}, [props.value])

	useImperativeHandle(props.ref, () => ({
		...methods,
		setValue: (value: string) => setValue(value),
		getValue: () => value || '',
	}))

	return (
		<TextField
			inputRef={inputRef}
			id={props.id}
			variant="outlined"
			value={value}
			multiline={props.multiline}
			minRows={props.minRows ? props.minRows - 1 : undefined}
			maxRows={props.maxRows ? props.maxRows - 1 : undefined}
			slotProps={{
				htmlInput: inputBindings,
				input: {
					startAdornment: Boolean(props.prefix) && <div css={cssPrefix}>{props.prefix}</div>,
					endAdornment: Boolean(props.suffix) && <div css={cssSuffix}>{props.suffix}</div>,
				},
			}}
			className={props.className}
			css={cssMaterial}
			onChange={onChange}
			onKeyDown={onKeyDown}
			onFocus={props.onFocus}
			onBlur={props.onBlur}
		/>
	)
}
