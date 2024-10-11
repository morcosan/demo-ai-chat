import { ReactNode } from 'react'

export type ModalWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ModalHeight = 'fit' | 'full'

export interface ModalProps extends ReactProps {
	opened: boolean
	width?: ModalWidth
	height?: ModalHeight
	noClose?: boolean

	slotTitle: ReactNode
	slotButtons?: ReactNode

	onClose?(): void
}
