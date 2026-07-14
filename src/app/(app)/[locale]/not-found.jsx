'use client';
import Layout from '@/components/Shared/Layout';
import LottieAnimation from '@/components/Contact/LottieAnimation';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { useTranslations } from 'next-intl';

const NotFound = () => {
  const t = useTranslations('NotFound');
  useEffect(() => {
    const firstToast = toast.error(t('title'), {
      description: t('description'),
      duration: 4000,
    });

    const toastTimeout = setTimeout(() => {
      toast.error(t('title'), {
        description: t('description'),
        duration: Infinity,
      });
    }, 5000);

    return () => {
      toast.dismiss(firstToast);
      clearTimeout(toastTimeout);
    };
  }, [t]);

  return (
    <>
      <main className="flex flex-col items-center justify-center text-dark w-full min-h-screen lg:min-h-[90vh] dark:text-light gap-4">
        <Layout className="!my-0 !py-0">
          <div className="w-full">
            <LottieAnimation animation="/404.lottie" />
          </div>
        </Layout>
      </main>
      <Toaster theme='system' />
    </>
  );
};

export default NotFound;
