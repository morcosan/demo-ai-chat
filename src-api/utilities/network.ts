import { ApiResponse, STATUS__NOT_FOUND, STATUS__SERVER_ERROR } from '../types'
import { randomInt, randomTrue } from './random'

export const RESP__NOT_FOUND: ApiResponse = { status: STATUS__NOT_FOUND, data: null }
export const RESP__SERVER_ERROR: ApiResponse = { status: STATUS__SERVER_ERROR, data: null }

export const applyNetwork = async (resp: ApiResponse | Promise<ApiResponse>): Promise<ApiResponse> => {
	// Simulate network throttling
	await wait(randomInt(0, 3000))

	// Simulate server crash
	return randomTrue() ? resp : RESP__SERVER_ERROR
}
