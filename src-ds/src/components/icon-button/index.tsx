import { useUiLibrary } from '@ds/release'
import { IconButtonProps } from './_types'
import { AntImpl } from './impl/ant-impl'
import { CustomImpl } from './impl/custom-impl'
import { MuiImpl } from './impl/mui-impl'

export type { LinkType } from '../_shared/types'
export type { IconButtonProps, IconButtonSize, IconButtonVariant } from './_types'

export const IconButton = (props: IconButtonProps) => {
	const { uiLibrary } = useUiLibrary()

	if (uiLibrary === 'custom') return <CustomImpl {...props} />
	if (uiLibrary === 'material') return <MuiImpl {...props} />
	if (uiLibrary === 'antdesign') return <AntImpl {...props} />
}
