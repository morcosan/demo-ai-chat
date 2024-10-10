import { useUiLibrary } from '@ds/release'
import { ButtonProps } from './_types'
import { AntImpl } from './impl/ant-impl'
import { CustomImpl } from './impl/custom-impl'
import { MuiImpl } from './impl/mui-impl'

export type { LinkType } from '../_shared/types'
export type { ButtonHighlight, ButtonProps, ButtonSize, ButtonVariant } from './_types'

export const Button = (props: ButtonProps) => {
	const { uiLibrary } = useUiLibrary()

	if (uiLibrary === 'custom') return <CustomImpl {...props} />
	if (uiLibrary === 'material') return <MuiImpl {...props} />
	if (uiLibrary === 'antdesign') return <AntImpl {...props} />
}
