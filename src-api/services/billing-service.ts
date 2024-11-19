import { ApiResponse, BillingApiPayload, BillingDTO, Status } from '@api/types'
import { getDbBilling, resetDbBilling, setDbBilling } from './db'

export const billingService = {
	async getBilling(): Promise<ApiResponse<BillingDTO>> {
		return { status: Status.SUCCESS, data: getDbBilling() }
	},

	async patchBilling(payload: BillingApiPayload): Promise<ApiResponse<BillingDTO>> {
		const dbBilling = getDbBilling()

		setDbBilling({
			name: payload.name?.trim() || dbBilling.name,
			address: payload.address?.trim() || dbBilling.address,
			city: payload.city?.trim() || dbBilling.city,
			country: payload.country?.trim() || dbBilling.country,
			postalCode: payload.postalCode?.trim() || dbBilling.postalCode,
			vatNumber: payload.vatNumber?.trim() || '',
		})

		return { status: Status.SUCCESS, data: getDbBilling() }
	},

	async resetDB() {
		resetDbBilling()
	},
}
