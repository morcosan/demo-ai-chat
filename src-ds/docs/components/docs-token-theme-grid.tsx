import { ReactNode } from 'react'

interface Props {
	lightSlot: ReactNode
	darkSlot: ReactNode
}

export const DocsTokenThemeGrid = ({ lightSlot, darkSlot }: Props) => {
	return (
		<div className="grid grid-cols-[45px_auto] items-center">
			<div className="text-size-sm font-weight-md">Light:</div>
			<div>{lightSlot}</div>

			<div className="text-size-sm font-weight-md">Dark:</div>
			<div>{darkSlot}</div>
		</div>
	)
}
