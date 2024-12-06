import { AgentsProvider } from './_agents-store/provider'
import { LayoutProvider } from './_layout-store/provider'
import { MultiStoreProvider } from './_multi-store/provider'
import { PreviewProvider } from './_preview-store/provider'
import { SearchProvider } from './_search-store/provider'

export const AiChatProvider = ({ children }: ReactProps) => {
	return (
		<LayoutProvider>
			<SearchProvider>
				<AgentsProvider>
					<PreviewProvider>
						<MultiStoreProvider>{children}</MultiStoreProvider>
					</PreviewProvider>
				</AgentsProvider>
			</SearchProvider>
		</LayoutProvider>
	)
}
