import { DbBilling } from '@api/types'
import { faker } from '@faker-js/faker'
import { COOKIE_KEY, randomFullName } from '@utils/release'

let _billing: DbBilling

const getDbBilling = () => _billing

const setDbBilling = (value: DbBilling) => {
	_billing = value
	localStorage.setItem(COOKIE_KEY.DB_BILLING, JSON.stringify(value))
}

const initBillingDB = () => {
	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_BILLING)
		_billing = JSON.parse(json || '')
	} catch (_) {
		resetDbBilling()
	}
}

const resetDbBilling = () => {
	setDbBilling({
		name: randomFullName(),
		address: faker.location.streetAddress({ useFullAddress: true }),
		city: faker.location.city(),
		country: faker.location.country(),
		postalCode: faker.location.zipCode(),
		vatNumber: `VAT-${faker.number.int({ min: 10000000, max: 99999999 })}`,
	})
}

export { getDbBilling, initBillingDB, resetDbBilling, setDbBilling }
