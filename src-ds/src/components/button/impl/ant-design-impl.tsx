// noinspection DuplicatedCode

import { CSS__ABSOLUTE_CENTER } from '@utils/release'
import { Button } from 'antd'
import { ButtonProps } from '../_types'
import { useBaseImpl } from './_base-impl'

export const AntDesignImpl = (rawProps: ButtonProps) => {
	const { bindings, cssButton, cssChildren, props, tokens } = useBaseImpl(rawProps)

	const cssAntDesign: CSS = {
		...cssButton,
		transition: 'unset',
		textAlign: 'unset',

		'&.ant-btn-default': {
			backgroundColor: tokens.bgColor,
			boxShadow: 'unset',

			'&:not(:disabled):hover': {
				borderColor: tokens.borderColor,
			},
		},
		'&:not(:disabled):focus-visible': {
			outline: 'revert',
			outlineOffset: tokens.outlineOffset,
		},
		'&:disabled, &.ant-btn-disabled, &.ant-btn-loading': {
			opacity: tokens.opacity,
			cursor: tokens.cursor,
		},
		'&:not(:disabled):not(.ant-btn-disabled):hover': {
			color: tokens.textColor,
			backgroundColor: tokens.bgColor,
		},
		'& > span:first-of-type': props.loading ? CSS__ABSOLUTE_CENTER : {},
		'& .ant-wave': props.highlight !== 'default' ? { display: 'none' } : {},
	}

	bindings.loading = props.loading
	bindings.css = cssAntDesign

	return (
		<Button {...bindings}>
			<span css={cssChildren}>{props.children}</span>
		</Button>
	)
}
