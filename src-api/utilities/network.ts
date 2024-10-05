import { API__MAX_THROTTLING, API__RANDOM_ERROR } from '@api/config'
import { randomFalse, randomInt } from '@utils/release'
import { ApiResponse, STATUS__NOT_FOUND, STATUS__SERVER_ERROR } from '../types'

export const RESP__NOT_FOUND: ApiResponse = { status: STATUS__NOT_FOUND, data: null }
export const RESP__SERVER_ERROR: ApiResponse = { status: STATUS__SERVER_ERROR, data: null }

export const applyNetwork = async (resp: ApiResponse | Promise<ApiResponse>): Promise<ApiResponse> => {
	// Simulate network throttling
	await wait(randomInt(0, API__MAX_THROTTLING))

	// Simulate server crash
	return API__RANDOM_ERROR && randomFalse() ? RESP__SERVER_ERROR : resp
}
