import { useUiLibrary } from '@ds/release'
import { withRef } from '@utils/release'
import { Ref } from 'react'
import { TextFieldProps, TextFieldRef } from './_types'
import { AntImpl } from './impl/ant-impl'
import { CustomImpl } from './impl/custom-impl'
import { MuiImpl } from './impl/mui-impl'

export type { TextFieldProps, TextFieldRef, TextFieldSize } from './_types'

const CustomImp = withRef('CustomImpl', CustomImpl)
const MuiImp = withRef('MuiImpl', MuiImpl)
const AntImp = withRef('AntImpl', AntImpl)

export const TextField = withRef('TextField', (props: TextFieldProps, ref: Ref<TextFieldRef>) => {
	const { uiLibrary } = useUiLibrary()

	if (uiLibrary === 'custom') return <CustomImp {...props} ref={ref} />
	if (uiLibrary === 'material') return <MuiImp {...props} ref={ref} />
	if (uiLibrary === 'antdesign') return <AntImp {...props} ref={ref} />
})
