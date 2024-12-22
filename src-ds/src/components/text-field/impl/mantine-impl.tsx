import { Textarea, TextareaProps, TextInput } from '@mantine/core'
import '@mantine/core/styles/Input.css'
import { useCallback, useEffect, useImperativeHandle, useState } from 'react'
import { TextFieldProps } from '../_types'
import { InputElement, useBaseImpl } from './_base-impl'

export const MantineImpl = (rawProps: TextFieldProps) => {
	const b = useBaseImpl(rawProps)
	const { cssInput, cssPrefix, cssSuffix, cssRoot, inputRef, inputBindings, methods, props, tokens, onKeyDown } = b
	const [value, setValue] = useState(props.value)

	const cssMantine: CSS = {
		'.mantine-Input-wrapper': {
			...cssRoot,
			width: '100%',
			height: props.multiline ? '100%' : tokens.minHeight,
		},
		'.mantine-Input-input': {
			...cssInput,
			border: 'unset',
		},
		'.mantine-Input-section': {
			position: 'unset',
			width: 'unset',
			color: 'unset',
		},
		'.mantine-Input-section[data-position="left"]': cssPrefix,
		'.mantine-Input-section[data-position="right"]': cssSuffix,
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

	const bindings = {
		...inputBindings,
		ref: inputRef,
		id: props.id,
		value: value,
		leftSection: props.prefix,
		rightSection: props.suffix,
		className: props.className,
		css: cssMantine,
		onFocus: props.onFocus,
		onBlur: props.onBlur,
		onChange: onChange,
		onKeyDown: onKeyDown,
	}
	const bindingsForTextArea: TextareaProps = {
		...bindings,
		autosize: true,
		minRows: props.minRows,
		maxRows: props.maxRows || undefined,
	}

	return props.multiline ? <Textarea {...bindingsForTextArea} /> : <TextInput {...bindings} />
}
