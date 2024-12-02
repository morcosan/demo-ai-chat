import { PanelBase } from '../../components/panel-base'
import { useAiChatPreview } from '../../state'

interface Props {
	isChatView?: boolean
}

export const PreviewView = ({ isChatView }: Props) => {
	const { previewContent, previewSource, previewType } = useAiChatPreview()

	const isChatSource = Boolean(previewSource && previewSource.parentId === previewSource.chatId)
	const isVisible = Boolean(previewContent && isChatView === isChatSource)

	return (
		<div className={cx('absolute-overlay', !isVisible && 'hidden')}>
			<PanelBase>preview</PanelBase>
		</div>
	)
}
