import { useUiLibrary } from '@ds/release'
import { IconButtonProps } from './_types'
import { AntDesignImpl } from './impl/ant-design-impl'
import { CustomImpl } from './impl/custom-impl'
import { MantineImpl } from './impl/mantine-impl'
import { MaterialImpl } from './impl/material-impl'

export type { LinkType } from '../_shared/types'
export type { IconButtonProps, IconButtonSize, IconButtonVariant } from './_types'

export const IconButton = (props: IconButtonProps) => {
	const { uiLibrary } = useUiLibrary()

	if (uiLibrary === 'custom') return <CustomImpl {...props} />
	if (uiLibrary === 'mantine') return <MantineImpl {...props} />
	if (uiLibrary === 'antdesign') return <AntDesignImpl {...props} />
	if (uiLibrary === 'material') return <MaterialImpl {...props} />
}
