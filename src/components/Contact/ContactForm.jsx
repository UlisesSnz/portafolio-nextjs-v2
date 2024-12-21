'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import ContactFormInputs from './ContactFormInputs';

const ContactForm = () => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setLoading(true);
        const params = {
            "name":data.name, //key value must be same as in your template in emailjs
            "email":data.email,
            "phone":data.phone,
            "message": data.message,
        }
        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT,
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
                // console.log(error);
                toast.error('Algo salió mal',
                    {
                        description: 'Por favor vuelve a intentar enviar el mensaje.',
                    }
                )
            }
        )
    }

    // console.log(errors);

    return (
        <ContactFormInputs register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} loading={loading} />
    );
}

export default ContactForm;