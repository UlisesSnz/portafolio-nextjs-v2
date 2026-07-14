'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import ContactFormInputs from './ContactFormInputs';
import { useTranslations } from 'next-intl';

const ContactForm = () => {
    const t = useTranslations('Contact');
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
                toast.success(t('sent'),
                    {
                        description: t('sentDescription'),
                    }
                )
                reset();
            },error => {
                setLoading(false);
                // console.log(error);
                toast.error(t('error'),
                    {
                        description: t('errorDescription'),
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
