import { API__MAX_THROTTLING, API__RANDOM_ERROR } from '@api/config'
import { randomFalse, randomInt } from '@utils/release'
import { ApiResponse, Status } from '../types'

export const RESP__INVALID_DATA: ApiResponse = { status: Status.INVALID_DATA, data: null }
export const RESP__NOT_AVAILABLE: ApiResponse = { status: Status.NOT_AVAILABLE, data: null }
export const RESP__NOT_FOUND: ApiResponse = { status: Status.NOT_FOUND, data: null }
export const RESP__SERVER_ERROR: ApiResponse = { status: Status.SERVER_ERROR, data: null }

export const applyNetwork = async (resp: ApiResponse | Promise<ApiResponse>): Promise<ApiResponse> => {
	// Simulate network throttling
	await wait(randomInt(0, API__MAX_THROTTLING))

	// Simulate server crash
	return API__RANDOM_ERROR && randomFalse() ? RESP__SERVER_ERROR : resp
}
