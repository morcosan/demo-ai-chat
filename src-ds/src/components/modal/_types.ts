import { ReactNode } from 'react'

export type ModalWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ModalHeight = 'fit' | 'full'

export interface ModalProps extends ReactProps {
	width: ModalWidth
	height?: ModalHeight
	noClose?: boolean

	slotTitle: ReactNode
	slotButtons?: ReactNode
}

export interface ModalRef {
	open(): void
	close(): void
}
