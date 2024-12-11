import { AccountDTO, BillingDTO } from '@api/types'
import { Account, Billing } from './_types'

export const mapAccount = (dto: AccountDTO): Account => {
	return {
		name: dto.name || '',
		email: dto.email || '',
		phone: dto.phone || '',
		avatar: dto.avatar || '',
		openaiApiKey: dto.openaiApiKey || '',
		anthropicApiKey: dto.anthropicApiKey || '',
	}
}

export const mapBilling = (dto: BillingDTO): Billing => {
	return {
		name: dto.name || '',
		address: dto.address || '',
		city: dto.city || '',
		country: dto.country || '',
		postalCode: dto.postalCode || '',
		vatNumber: dto.vatNumber || '',
	}
}
