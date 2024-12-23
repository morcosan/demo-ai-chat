import { ReactNode } from 'react'

export type ModalWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ModalHeight = 'fit' | 'full'

export interface ModalProps {
	// Slots
	title: ReactNode
	children: ReactNode
	actions?: ReactNode
	extras?: ReactNode

	// Props
	opened: boolean
	width?: ModalWidth
	height?: ModalHeight
	noDismiss?: boolean
	noClose?: boolean
	noFooter?: boolean

	// Events
	onOpened?(): void
	onClose?(): void
	onClosed?(): void
}
