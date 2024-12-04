import { createPortal } from 'react-dom'

export const Portal = ({ children }: ReactProps) => {
	return createPortal(children, document.body)
}
