import { WarningSvg } from '@ds/release'

interface Props {
	error?: string
}

export const FieldError = ({ error }: Props) => {
	return error ? (
		<div className="flex items-center text-size-sm leading-1 text-color-danger">
			<WarningSvg className="mr-xs-2 w-xs-6" />
			{error}
		</div>
	) : null
}
