import { ApiResponse } from '../types'
import { STATUS_NOT_FOUND, STATUS_SERVER_ERROR } from '../types/constants'
import { randomInt, randomTrue } from './random'

export const RESP_NOT_FOUND: ApiResponse = { status: STATUS_NOT_FOUND, data: null }
export const RESP_SERVER_ERROR: ApiResponse = { status: STATUS_SERVER_ERROR, data: null }

export const applyNetwork = async (resp: ApiResponse | Promise<ApiResponse>): Promise<ApiResponse> => {
	// Simulate network throttling
	await wait(randomInt(0, 3000))

	// Simulate server crash
	return randomTrue() ? resp : RESP_SERVER_ERROR
}
