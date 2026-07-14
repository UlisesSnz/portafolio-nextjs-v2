import { SendIcon } from '../Shared/Icons';
import { useTranslations } from 'next-intl';

const ContactFormInputs = ({ register, handleSubmit, onSubmit, loading }) => {
    const t = useTranslations('Contact');
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="leading-relaxed">
            {t('greeting')}{" "}
            <input
                type="text"
                placeholder={t('namePlaceholder')}
                {...register("name", { required: true, maxLength: 80 })}
                className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-sm border-b border-gray 
                focus:border-gray bg-transparent sm:w-1/2 w-1/3"
            />
            {t('wantContact')}
            <input
                type="email"
                placeholder={t('emailPlaceholder')}
                {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} 
                className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-sm border-b border-gray 
                focus:border-gray bg-transparent sm:w-1/2 w-1/3"
            />
            {t('orPhone')}
            <input
                type="tel"
                placeholder={t('phonePlaceholder')}
                {...register("phone", { required: true, maxLength: 20 })}
                className="outline-none border-0 p-0 mx-2 focus:ring-0 placeholder:text-center placeholder:text-sm border-b border-gray 
                focus:border-gray bg-transparent sm:w-1/3"
            />
            {t('details')} <br />
            <textarea
                {...register("message", { required: true, maxLength: 200 })} 
                placeholder={t('messagePlaceholder')}
                rows={3}
                className="mt-1 sm:mt-0 w-full outline-none border-0 p-0 mx-0 focus:ring-0 placeholder:text-sm border-b border-gray focus:border-gray bg-transparent"
            />
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
                        ? t('sending')
                        : <>{t('send')} <SendIcon className={"h-auto ml-1 !w-6 md:!w-4"} /></>
                }
            </button>
        </form>
    );
}

export default ContactFormInputs;
