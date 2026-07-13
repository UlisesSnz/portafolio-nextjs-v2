import { getWriteClient } from '@/sanity/lib/writeClient';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const data = await req.json();
    const { name, email, comment, postId } = data;

    if (!name || !email || !comment || !postId) {
        return NextResponse.json(
            {
                message: "Todos los campos son obligatorios",
            },
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
        { message: 'Gracias. Lo revisaré muy pronto.', comment: newComment },
        { status: 201 }
    );
    } catch (error) {
        return NextResponse.json(
            { message: 'Por favor vuelve a intentar enviar el comentario.', error: error.message },
            { status: 500 }
        );
    }
}
