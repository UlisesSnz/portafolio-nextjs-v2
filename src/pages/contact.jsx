import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import Head from 'next/head';
import emailjs from '@emailjs/browser';
import { toast, Toaster } from 'sonner';
import TransitionEffect from '@/components/TransitionEffect';
import LottieAnimation from '@/components/LottieAnimation';
import ContactForm from '@/components/ContacForm';

const contact = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        // console.log(data);
        setLoading(true);
        const params = {
            "name":data.name, //key value must be same as in your template in emailjs
            "email":data.email,
            "phone":data.phone,
            "message": data.message,
        }
        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
            {
              name: params.name,
              phone: params.phone,
              email: params.email,
              message: params.message,
            },
            process.env.NEXT_PUBLIC_EMAILJS_USER_ID
        )
            .then(() => {
                setLoading(false);
                toast.success('Mensaje enviado',
                    {
                        description: 'Gracias. Me comunicaré contigo lo antes posible.',
                    }
                )
                reset();
            },error => {
                setLoading(false);
                console.log(error);
                toast.error('Algo salió mal',
                    {
                        description: 'Por favor vuelva a intentar enviar el mensaje.',
                    }
                )
            }
        )
    }

    console.log(errors);

    return (
        <>
            <Head>
                <title>Contactame | Ulises Sánchez</title>
                <meta name="description" content="any description" />
            </Head>
            <TransitionEffect />
            <main className="flex items-center text-dark w-full min-h-screen dark:text-light sm:items-start">
                <Layout className="!pt-0 md:!pt-16 sm:!pt-16">
                    <div className="flex items-center justify-between w-full lg:flex-col">
                        <div className="w-1/2 md:w-full">
                            <LottieAnimation />
                        </div>
                        <div className="w-1/2 flex flex-col items-center self-center lg:w-full">
                            <AnimatedText
                                text="¡Conectemos!"
                                className="!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
                            />
                            <div className="my-4 text-base font-medium md:text-sm sm:text-xs">
                                <ContactForm register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} loading={loading} />
                            </div>
                        </div>
                    </div>
                </Layout>
            </main>
            <Toaster theme='system' duration={3000} />
        </>
    )
}

export default contact;
