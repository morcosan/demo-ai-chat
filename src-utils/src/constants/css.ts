export const CSS__ABSOLUTE_OVERLAY: CSS = {
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
}

export const CSS_A11Y_OUTLINE_PROXY: CSS = {
	'&:has(:focus), &:has(:focus-visible)': {
		outline: 'auto',
		outlineColor: '-webkit-focus-ring-color',
		outlineOffset: 'var(--ds-spacing-a11y-outline)',
	},
}
