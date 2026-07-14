import { getWriteClient } from '@/sanity/lib/writeClient';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const data = await req.json();
    const { name, email, comment, postId, contentType } = data;

    if (!name || !email || !comment || !postId || !contentType) {
        return NextResponse.json(
            {
                code: 'MISSING_FIELDS',
            },
            { status: 400 }
        );
    }

    if (!['article', 'project'].includes(contentType)) {
        return NextResponse.json(
            { code: 'INVALID_CONTENT_TYPE' },
            { status: 400 }
        );
    }

    try {
        const newComment = await getWriteClient().create({
        _type: 'comment',
        name,
        email,
        comment,
        relatedDocument: {
            _type: 'reference',
            _ref: postId, // ID de proyecto o artículo
        },
    });
    return NextResponse.json(
        { code: 'COMMENT_CREATED', comment: newComment },
        { status: 201 }
    );
    } catch (error) {
        return NextResponse.json(
            { code: 'COMMENT_CREATE_FAILED', error: error.message },
            { status: 500 }
        );
    }
}
