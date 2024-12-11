import { DbAccount } from '@api/types'
import { faker } from '@faker-js/faker'
import { COOKIE_KEY, randomAvatar, randomFullName } from '@utils/release'

let _account: DbAccount

const getDbAccount = () => _account

const setDbAccount = (value: DbAccount) => {
	_account = value
	localStorage.setItem(COOKIE_KEY.DB_ACCOUNT, JSON.stringify(value))
}

const initAccountDB = async () => {
	try {
		const json = localStorage.getItem(COOKIE_KEY.DB_ACCOUNT)
		_account = JSON.parse(json || '')
	} catch (_) {
		resetDbAccount(true)
	}
}

const resetDbAccount = (random: boolean) => {
	const name = randomFullName()

	setDbAccount({
		name,
		email: faker.internet.email(),
		phone: random ? faker.phone.number({ style: 'international' }) : '',
		avatar: randomAvatar(),
		openaiApiKey: '',
		anthropicApiKey: '',
	})
}

export { getDbAccount, initAccountDB, resetDbAccount, setDbAccount }
