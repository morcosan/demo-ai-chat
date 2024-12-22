// noinspection DuplicatedCode

import { Button } from '@mantine/core'
import '@mantine/core/styles/Button.css'
import '@mantine/core/styles/Loader.css'
import { ButtonProps } from '../_types'
import { useBaseImpl } from './_base-impl'

export const MantineImpl = (rawProps: ButtonProps) => {
	const { bindings, cssButton, cssChildren, props, tokens } = useBaseImpl(rawProps)

	const cssMantine: CSS = {
		...cssButton,
		'--button-hover': tokens.bgColor,
		'--button-hover-color': tokens.textColor,
		'--button-color': `${tokens.textColor} !important`,
		overflow: 'unset',

		'&::before': {
			...(cssButton['&::before'] as CSS),
			backgroundColor: 'unset',
			opacity: 'unset',
			transform: 'unset',
			filter: 'unset',
		},

		'&.mantine-focus-auto:focus-visible': {
			outline: 'revert',
			outlineOffset: 'revert',
		},
		'&.mantine-active:active': {
			transform: tokens.pressTransform,
		},
		'.mantine-Button-loader': { lineHeight: 1 },
		'.mantine-Button-inner': { transform: 'unset' },
		'.mantine-Button-label': cssChildren,
	}

	const fixButtonAttrs = (elem: HTMLButtonElement | null) => {
		elem?.removeAttribute('disabled')
		// These classes have too much specificity and create conflicts
		elem?.classList.forEach((c) => c.startsWith('m_') && elem?.classList.remove(c))
	}

	bindings.loading = props.loading
	bindings.css = cssMantine
	bindings.component = props.linkHref ? 'a' : undefined

	return (
		<Button {...bindings} ref={fixButtonAttrs}>
			{props.children}
		</Button>
	)
}
