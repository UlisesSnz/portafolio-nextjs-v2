'use client';
import { useState, useEffect, useRef } from 'react';
import { getComments, getCommentsListen } from '@/sanity/sanity.query';
import Link from 'next/link';

const ShowComments = ({ postId, slug, commentsOrder }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const subscriptionRef = useRef(null);

    useEffect(() => {
        if(subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
        }

        const fetchInitialComments = async () => {
            setLoading(true);
            try {
                const initialComments = await getComments(postId, commentsOrder);
                setComments(initialComments);
            } catch(error) {
                console.log('Error al obtener comentarios');
            } finally {
                setLoading(false);
            }
        }

        fetchInitialComments();

        subscriptionRef.current = getCommentsListen(postId, commentsOrder).subscribe(update => {
            if(update.result && update.transition === 'appear') {
                setComments(prevComments => {
                    const exists = prevComments.some(comment => comment._id === update.result._id);
                    if(!exists) {
                        if(commentsOrder === 'desc') {
                            return [update.result, ...prevComments];
                        } else {
                            return [...prevComments, update.result];
                        }
                    }
                    return prevComments;
                });
            }
        });

        return () => subscriptionRef.current.unsubscribe();
    }, [postId, commentsOrder]);

    return (
        <>
            <h3 className="font-bold text-4xl w-full text-center my-16 mt-32">Todos los comentarios</h3>
            {loading &&
                <div className="animate-pulse">
                    <p>Cargando comentarios...</p>
                </div>
            }
            {!loading && comments.length === 0 && <p>Aún no hay comentarios, sé el primero en compartir tu opinión.</p>}
            {!loading && comments.length > 1 && (
                <div>
                    <Link
                        href={`/projects/${slug}?comments=desc`}
                        scroll={false}
                        className={`mr-3 font-semibold
                            ${commentsOrder === 'desc'
                                ? "text-primary dark:text-primaryDark underline underline-offset-2"
                                : ""
                            }
                        `}
                    >
                        Más recientes
                    </Link>
                    <Link
                        href={`/projects/${slug}?comments=asc`}
                        scroll={false}
                        className={`mr-3 font-semibold
                            ${commentsOrder !== 'desc'
                                ? "text-primary dark:text-primaryDark underline underline-offset-2"
                                : ""
                            }
                        `}
                    >
                        Más antiguos
                    </Link>
                </div>
            )}
            {comments.map(comment => (
                <div key={comment._id} className="border-b border-solid border-dark/40 dark:border-light/40 mt-4 py-1">
                    <p>
                        <strong>{comment.name}</strong>
                        <br />
                        {comment.comment}
                    </p>
                    <small className="text-dark/75 dark:text-light/75">
                        {new Date(comment._createdAt).toLocaleString()}
                    </small>
                </div>
            ))}
        </>
    )
}

export default ShowComments;
