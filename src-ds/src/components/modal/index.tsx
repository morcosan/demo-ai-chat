import { useUiLibrary } from '@ds/release'
import { withRef } from '@utils/release'
import { Ref } from 'react'
import { ModalProps, ModalRef } from './_types'
import { CustomImpl } from './impl/custom-impl'

export type { ModalProps, ModalRef, ModalWidth } from './_types'

const CustomImp = withRef('CustomImpl', CustomImpl)
// const MuiImp = withRef('MuiImpl', MuiImpl)
// const AntImp = withRef('AntImpl', AntImpl)

export const Modal = withRef('Modal', (props: ModalProps, ref: Ref<ModalRef>) => {
	const { uiLibrary } = useUiLibrary()

	if (uiLibrary === 'custom') return <CustomImp {...props} ref={ref} />
	// if (uiLibrary === 'material') return <MuiImp {...props} ref={ref} />
	// if (uiLibrary === 'antdesign') return <AntImp {...props} ref={ref} />
})
