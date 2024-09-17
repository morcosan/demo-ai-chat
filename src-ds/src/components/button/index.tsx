import { useUiLibrary } from '@ds/release'
import { AntdImpl } from './impl/antd-impl'
import { CustomImpl } from './impl/custom-impl'
import { MuiImpl } from './impl/mui-impl'
import { ButtonProps } from './types'

export type { ButtonProps, ButtonSize, ButtonVariant, LinkType } from './types'

export const Button = (props: ButtonProps) => {
	const { uiLibrary } = useUiLibrary()

	if (uiLibrary === 'custom') return <CustomImpl {...props} />
	if (uiLibrary === 'material') return <MuiImpl {...props} />
	if (uiLibrary === 'antdesign') return <AntdImpl {...props} />
}
