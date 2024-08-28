interface Props {
	size: 'xs' | 'md'
	label: string
}

export const Button = (props: Props) => {
	return (
		<button type="button">
			{props.label} {props.size}
		</button>
	)
}
