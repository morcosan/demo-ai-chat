import { LayoutProvider } from './_layout-store/provider'
import { MultiStoreProvider } from './_multi-store/provider'
import { SearchProvider } from './_search-store/provider'

export const AiChatProvider = ({ children }: ReactProps) => {
	return (
		<LayoutProvider>
			<SearchProvider>
				<MultiStoreProvider>{children}</MultiStoreProvider>
			</SearchProvider>
		</LayoutProvider>
	)
}
