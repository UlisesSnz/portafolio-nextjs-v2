import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';

export const runtime = 'nodejs';

function isAuthorized(authorization, secret) {
    if (!authorization) {
        return false;
    }

    const actual = Buffer.from(authorization);
    const expected = Buffer.from(`Bearer ${secret}`);

    return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function parseTags(body) {
    if (!Array.isArray(body?.tags) || body.tags.length === 0) {
        return null;
    }

    if (!body.tags.every(tag => typeof tag === 'string' && tag.length > 0)) {
        return null;
    }

    return [...new Set(body.tags)];
}

export async function POST(request) {
    const secret = process.env.SANITY_REVALIDATE_TAGS_SECRET;

    if (!secret) {
        return Response.json(
            { error: 'Falta configurar SANITY_REVALIDATE_TAGS_SECRET.' },
            { status: 500 }
        );
    }

    if (!isAuthorized(request.headers.get('authorization'), secret)) {
        return Response.json({ error: 'No autorizado.' }, { status: 401 });
    }

    let body;

    try {
        body = await request.json();
    } catch {
        return Response.json({ error: 'El cuerpo debe ser JSON válido.' }, { status: 400 });
    }

    const tags = parseTags(body);

    if (!tags) {
        return Response.json(
            { error: '`tags` debe ser un arreglo no vacío de cadenas.' },
            { status: 400 }
        );
    }

    for (const tag of tags) {
        revalidateTag(`sanity:${tag}`, { expire: 0 });
    }

    revalidatePath('/', 'layout');

    return Response.json({ revalidated: tags.length });
}
