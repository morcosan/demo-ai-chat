import { useUiLibrary } from '@ds/release'
import { ModalProps } from './_types'
import { AntDesignImpl } from './impl/ant-design-impl'
import { CustomImpl } from './impl/custom-impl'
import { MantineImpl } from './impl/mantine-impl'
import { MaterialImpl } from './impl/material-impl'

export type { ModalProps, ModalWidth } from './_types'

export const Modal = (props: ModalProps) => {
	const { uiLibrary } = useUiLibrary()

	if (uiLibrary === 'custom') return <CustomImpl {...props} />
	if (uiLibrary === 'mantine') return <MantineImpl {...props} />
	if (uiLibrary === 'antdesign') return <AntDesignImpl {...props} />
	if (uiLibrary === 'material') return <MaterialImpl {...props} />
}
