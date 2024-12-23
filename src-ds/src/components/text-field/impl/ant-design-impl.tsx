import { Input, InputRef } from 'antd'
import { Ref, useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { TextFieldProps } from '../_types'
import { InputElement, useBaseImpl } from './_base-impl'

export const AntDesignImpl = (rawProps: TextFieldProps) => {
	const base = useBaseImpl(rawProps)
	const { cssInput, cssPrefix, cssSuffix, cssRoot, inputRef, inputBindings, methods, props, onKeyDown } = base
	const [value, setValue] = useState(props.value)

	const cssAntWrapper: CSS = {
		...cssRoot,
		width: 'unset',
		border: 'none',
		padding: 0,
		background: 'transparent',

		'&::before': {
			...(cssRoot['&::before'] as CSS),
			display: 'unset',
			width: 'unset',
			visibility: 'unset',
		},

		'& .ant-input-prefix, & .ant-input-suffix': {
			marginInline: 0,
			'& > *:not(:last-child)': { marginInline: '0' },
		},
		'& .ant-input-prefix': cssPrefix,
		'& .ant-input-suffix': cssSuffix,
	}

	const cssAntInput: CSS = {
		'& > .ant-input': {
			...cssInput,
			border: 'none',
			minHeight: `${cssInput.minHeight} !important`,
			padding: `${cssInput.padding} !important`,
			fontSize: `${cssInput.fontSize} !important`,
			fontFamily: 'inherit',
		},
	}

	const onChange = useCallback(
		(event: ReactChangeEvent<InputElement>) => {
			setValue(event.target.value)
			props.onChange?.(event.target.value, event)
		},
		[props.onChange]
	)

	useEffect(() => {
		setValue(props.value)
	}, [props.value])

	useImperativeHandle(props.ref, () => ({
		...methods,
		setValue: (value: string) => setValue(value),
		getValue: () => value || '',
	}))

	const rootBindings = {
		className: props.className,
		css: [cssAntWrapper, cssAntInput],
	}
	const bindings = {
		...inputBindings,
		ref: inputRef as unknown as Ref<InputRef>,
		id: props.id,
		value: value,
		onFocus: props.onFocus,
		onBlur: props.onBlur,
		onChange: onChange,
		onKeyDown: onKeyDown,
	}
	const bindingsForInput = {
		...bindings,
		prefix: props.prefix,
		suffix: props.suffix,
	}
	const bindingsForTextArea = {
		...bindings,
		autoSize: props.maxRows
			? { minRows: props.minRows || 1, maxRows: props.maxRows }
			: { minRows: props.minRows || 1 },
	}

	return props.multiline || (!props.prefix && !props.suffix) ? (
		// Ant Design removes wrapper for multiline and 0 slots
		<div {...rootBindings}>
			{Boolean(props.prefix) && <div css={cssPrefix}>{props.prefix}</div>}

			{props.multiline ? <Input.TextArea {...bindingsForTextArea} /> : <Input {...bindingsForInput} />}

			{Boolean(props.suffix) && <div css={cssSuffix}>{props.suffix}</div>}
		</div>
	) : props.multiline ? (
		<Input.TextArea {...bindingsForTextArea} {...rootBindings} />
	) : (
		<Input {...bindingsForInput} {...rootBindings} />
	)
}
