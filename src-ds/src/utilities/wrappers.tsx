import { ReactNode } from 'react'

export interface Wrapper<C> {
	elem: C
	props?: JsxProps<C>
}

interface Props extends ReactProps {
	wrappers: Wrapper<any>[]
}

export const Wrappers = ({ children, wrappers }: Props) => {
	return wrappers.reduceRight(
		(acc: ReactNode, wrapper: any) => <wrapper.elem {...(wrapper.props || {})}>{acc}</wrapper.elem>,
		children
	)
}
