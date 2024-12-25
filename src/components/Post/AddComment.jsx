'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import { SendIcon } from '../Shared/Icons';

const AddComment = ({ postId, postTitle }) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        const { name, email, comment } = data;
        const res = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ name, email, comment, postId }),
        });
        const result = await res.json();
        if (!res.ok) {
            setLoading(false);
            console.log(result.error)
            toast.error('Algo salió mal',
                {
                    description: result.message || 'Por favor vuelve a intentar enviar el comentario.',
                }
            )
            return;
        }
        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_COMMENT,
            {
                post: postTitle,
                name,
                email,
                comment,
            },
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        )
            .then(() => {
                setLoading(false);
                toast.success('Comentario enviado',
                    {
                        description: result.message || 'Gracias. Lo revisaré muy pronto.',
                    }
                )
                reset();
            },error => {
                setLoading(false);
                toast.error('Error al notificar',
                    {
                        description: 'Se guardó tu comentario, pero ocurrió un error al intentar enviarme una notificación.',
                    }
                )
            }
        )
    }

    return (
        <div className="mb-4 text-base font-medium md:text-sm sm:text-xs w-full">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col border border-solid border-dark dark:border-light rounded-xl p-8 space-y-6"
            >
                <p className="mb-4">
                    Comparte tu opinión o plantea tus preguntas. Ten la seguridad de que me tomaré el tiempo
                    de leer y responder cada comentario.
                </p>
                <div className="flex flex-row sm:flex-col gap-6">
                    <div className="w-1/2 sm:w-full flex flex-col">
                        <label className="mb-2 text-sm sm:text-xs font-semibold" htmlFor="comment-name">Nombre</label>
                        <input
                            id="comment-name"
                            {...register("name", { required: true, maxLength: 80 })}
                            type="text"
                            className="outline-none p-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-0
                            focus:border-gray-500 dark:focus:border-gray-300 bg-transparent"
                        />
                    </div>
                    <div className="w-1/2 sm:w-full flex flex-col">
                        <label className="mb-2 text-sm sm:text-xs font-semibold" htmlFor="comment-email">
                            Email&nbsp;
                            <span className="text-dark/75 dark:text-light/75 text-xs font-normal">(Tu email no será publicado)</span>
                        </label>
                        <input
                            id="comment-email"
                            {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                            type="email"
                            className="outline-none p-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-0
                            focus:border-gray-500 dark:focus:border-gray-300 bg-transparent"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="mb-2 text-sm sm:text-xs font-semibold" htmlFor="comment-content">Comentario</label>
                    <textarea
                        id="comment-content"
                        {...register("comment", { required: true, maxLength: 400 })}
                        className="outline-none p-3 border border-gray-300 dark:border-gray-500 rounded-lg focus:ring-0
                        focus:border-gray-500 dark:focus:border-gray-300 bg-transparent h-40 sm:h-32"
                    />
                </div>
                <button
                    className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg
                    font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark
                    dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light
                    md:p-2 md:px-4 md:text-base self-start mt-4
                    disabled:text-dark disabled:bg-light disabled:border-dark
                    disabled:dark:text-light disabled:dark:bg-dark disabled:dark:border-light"
                    disabled={loading}
                >
                    {
                        loading
                            ? 'Enviando'
                            : <>Enviar <SendIcon className={"h-auto ml-1 !w-6 md:!w-4"} /></>
                    }
                </button>
            </form>
        </div>
    )
}

export default AddComment;
