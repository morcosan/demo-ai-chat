import { DocsTokenCode } from '@ds/docs/components/docs-token-code.tsx'

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
			<DocsTokenCode icon="./typescript.svg" value={tsVar} size={tsSize} />

			{twVars.map((twVar: string) => (
				<DocsTokenCode key={twVar} icon="./tailwind.svg" value={twVar} size={twSize} />
			))}

			<DocsTokenCode icon="./css.svg" value={`var(${cssVar})`} size={cssSize} />
		</div>
	)
}
