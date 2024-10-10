import { ReactNode } from 'react'

export type ModalWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalProps extends ReactProps {
	title: ReactNode
	width: ModalWidth
	expanded?: boolean
	noClose?: boolean

	// Slots
	buttons?: ReactNode
}

export interface ModalRef {
	open(): void
	close(): void
}
