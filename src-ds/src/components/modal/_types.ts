import { ReactNode } from 'react'

export type ModalWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ModalHeight = 'fit' | 'full'

export interface ModalProps extends ReactProps {
	opened: boolean
	width?: ModalWidth
	height?: ModalHeight
	shallow?: boolean
	noClose?: boolean
	noFooter?: boolean

	slotTitle: ReactNode
	slotButtons?: ReactNode

	onOpen?(): void
	onClose?(): void
}
