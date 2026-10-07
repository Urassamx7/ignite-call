export function httpResponse(obj?: Record<string, any>, code: number = 200) {
	if (obj) {
		return Response.json(obj, { status: code })
	}
	return Response.json(null, { status: code })
}
