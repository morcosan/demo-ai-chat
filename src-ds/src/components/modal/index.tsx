import { useUiLibrary } from '@ds/release'
import { ModalProps } from './_types'
import { AntImpl } from './impl/ant-impl'
import { CustomImpl } from './impl/custom-impl'

export type { ModalProps, ModalWidth } from './_types'

export const Modal = (props: ModalProps) => {
	const { uiLibrary } = useUiLibrary()

	if (uiLibrary === 'custom') return <CustomImpl {...props} />
	// if (uiLibrary === 'material') return <MuiImpl {...props} />
	if (uiLibrary === 'antdesign') return <AntImpl {...props} />
}
