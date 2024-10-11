import { useDefaults } from '@utils/release'
import { ModalProps } from '../_types'

export const useModalBase = (rawProps: ModalProps) => {
	const props = useDefaults<ModalProps>(rawProps, {
		width: 'md',
		height: 'fit',
	})

	return {
		props,
	}
}
