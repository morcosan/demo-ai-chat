import { DocsTokenCode } from '@ds/docs/components/docs-token-code.tsx'
import CssSvg from '@ds/release/logos/css.svg'
import TailwindSvg from '@ds/release/logos/tailwind.svg'
import TypescriptSvg from '@ds/release/logos/typescript.svg'

interface Props {
	tsVar: string
	tsSize?: string
	twVars: string[]
	twSize?: string
	cssVar: string
	cssSize?: string
}

export const DocsTokenCoding = ({ tsVar, tsSize, twVars, twSize, cssVar, cssSize }: Props) => {
	return (
		<div className="mr-xs-9 flex gap-xs-3">
			<DocsTokenCode iconSvg={<TypescriptSvg className="h-full w-fit" />} value={tsVar} size={tsSize} />

			{twVars.map((twVar: string) => (
				<DocsTokenCode
					key={twVar}
					iconSvg={<TailwindSvg className="h-full w-fit" />}
					value={twVar}
					size={twSize}
				/>
			))}

			<DocsTokenCode iconSvg={<CssSvg className="h-full w-fit" />} value={`var(${cssVar})`} size={cssSize} />
		</div>
	)
}
