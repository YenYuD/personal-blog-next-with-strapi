import { UiService } from '@/service/server/uiService';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams.toString() || '';
	const res = await UiService.getLanguages(searchParams);

	return Response.json({ res });
}
