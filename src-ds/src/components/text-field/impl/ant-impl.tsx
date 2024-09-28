import { useUiTheme } from '@ds/release'
import { Input, InputRef } from 'antd'
import { ChangeEvent, Ref, useCallback } from 'react'
import { TextFieldProps, TextFieldRef } from '../_types'
import { InputElement, useTextFieldBase } from './_base'

export const AntImpl = (rawProps: TextFieldProps, ref: Ref<TextFieldRef>) => {
	const { props, cssInput, cssWrapper, inputRef, onKeyDown } = useTextFieldBase(rawProps, ref)
	const { $lineHeight } = useUiTheme()

	const cssAntWrapper: CSS = {
		...cssWrapper,
		background: 'transparent',
		border: 'none',

		'&::before': {
			display: 'unset',
			width: 'unset',
			visibility: 'unset',
			...(cssWrapper['&::before'] as CSS),
		},

		'& .ant-input-prefix, & .ant-input-suffix': {
			marginInline: 0,
			'& > *:not(:last-child)': { marginInline: '0' },
		},
	}

	const cssAntInput: CSS = {
		'& > .ant-input': {
			...cssInput,
			border: 'none',
			padding: `${cssInput.padding} !important`,
			fontSize: `${cssInput.fontSize} !important`,
			fontFamily: 'inherit',
			lineHeight: $lineHeight['md'],
		},
	}

	const onChange = useCallback(
		(event: ChangeEvent<InputElement>) => props.onChange?.(event.target.value, event),
		[props.onChange]
	)

	const bindingsWrapper = {
		className: props.className,
		style: props.style,
		css: [cssAntWrapper, cssAntInput],
	}
	const bindingsBase = {
		ref: inputRef as unknown as Ref<InputRef>,
		id: props.id,
		value: props.value,
		placeholder: props.placeholder,
		'aria-label': props.ariaLabel,
		'aria-description': props.ariaDescription,
		maxLength: props.maxLength || undefined,
		onChange: onChange,
		onKeyDown: onKeyDown,
	}
	const bindingsInput = {
		...bindingsBase,
		prefix: props.slotLeft,
		suffix: props.slotRight,
	}
	const bindingsTextArea = {
		...bindingsBase,
		autoSize: props.maxRows
			? { minRows: props.minRows || 1, maxRows: props.maxRows }
			: { minRows: props.minRows || 1 },
	}

	return props.multiline || (!props.slotLeft && !props.slotRight) ? (
		// Ant Design removes wrapper based on props, so it must be added manually
		<div {...bindingsWrapper}>
			{Boolean(props.multiline) && props.slotLeft}

			{props.multiline ? <Input.TextArea {...bindingsTextArea} /> : <Input {...bindingsInput} />}

			{Boolean(props.multiline) && props.slotRight}
		</div>
	) : props.multiline ? (
		<Input.TextArea {...bindingsTextArea} {...bindingsWrapper} />
	) : (
		<Input {...bindingsInput} {...bindingsWrapper} />
	)
}
