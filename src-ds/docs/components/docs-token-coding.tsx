import { DocsTokenCode } from '@ds/docs/components/docs-token-code.tsx'

interface Props {
	token: DesignToken
	twVars: string[]
	twSize?: string
	cssSize?: string
}

export const DocsTokenCoding = ({ token, twVars, twSize, cssSize }: Props) => {
	return (
		<div className="mr-xs-9 flex gap-xs-3">
			{twVars.map((twVar: string) => (
				<DocsTokenCode key={twVar} icon="./tailwind.svg" value={twVar} size={twSize} />
			))}

			<DocsTokenCode icon="./css.svg" value={`var(--ds-${token.name})`} size={cssSize} />
		</div>
	)
}
