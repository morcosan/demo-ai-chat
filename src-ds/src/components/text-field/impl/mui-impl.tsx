import { useUiTheme } from '@ds/release'
import TextField from '@mui/material/TextField'
import { ChangeEvent, Ref, useCallback, useEffect, useState } from 'react'
import { TextFieldProps, TextFieldRef } from '../_types'
import { InputElement, useTextFieldBase } from './_base'

export const MuiImpl = (rawProps: TextFieldProps, ref: Ref<TextFieldRef>) => {
	const base = useTextFieldBase(rawProps, ref)
	const { props, calcHeight, calcPaddingTextY, cssInput, cssWrapper, inputRef, onKeyDown } = base
	const { $lineHeight } = useUiTheme()
	const [innerValue, setInnerValue] = useState<string>(props.value || '')

	const cssInputHeight: CSS = (() => {
		if (props.multiline) {
			const lineCount = (innerValue || props.placeholder || '').split('\n').length
			const minRows = props.minRows || 1
			const height = `calc((${calcHeight} - 2 * ${calcPaddingTextY}) * ${minRows} + 2 * ${calcPaddingTextY})`

			if (lineCount <= minRows) {
				return { height: `${height} !important` }
			}
		}
		return {}
	})()

	const cssMuiWrapper: CSS = {
		'& .MuiInputBase-root': {
			...cssWrapper,
		},
		'& fieldset': { display: 'none' },
	}

	const cssMuiInput: CSS = {
		'& .MuiInputBase-input': {
			boxSizing: 'border-box',
			lineHeight: $lineHeight['md'],
			...cssInput,
			...cssInputHeight,
		},
	}

	const onChange = useCallback(
		(event: ChangeEvent<InputElement>) => {
			props.multiline && setInnerValue(event.target.value)
			props.onChange?.(event.target.value, event)
		},
		[props.multiline, props.onChange]
	)

	useEffect(() => {
		if (props.value !== innerValue) {
			setInnerValue(props.value || '')
		}
	}, [props.value])

	return (
		<TextField
			inputRef={inputRef}
			id={props.id}
			variant="outlined"
			value={props.value}
			placeholder={props.placeholder}
			multiline={props.multiline}
			minRows={props.minRows ? props.minRows - 1 : undefined}
			maxRows={props.maxRows ? props.maxRows - 1 : undefined}
			slotProps={{
				htmlInput: {
					maxLength: props.maxLength || undefined,
					'aria-label': props.ariaLabel,
					'aria-description': props.ariaDescription,
					readOnly: props.readonly,
					disabled: props.disabled,
				},
				input: {
					startAdornment: props.slotLeft,
					endAdornment: props.slotRight,
				},
			}}
			sx={[cssMuiWrapper, cssMuiInput]}
			className={props.className}
			style={props.style}
			onChange={onChange}
			onKeyDown={onKeyDown}
		/>
	)
}
