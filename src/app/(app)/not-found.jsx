'use client';
import Layout from '@/components/Shared/Layout';
import LottieAnimation from '@/components/Contact/LottieAnimation';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

const NotFound = () => {
  useEffect(() => {
    const firstToast = toast.error('¿Te has perdido?', {
      description: '¡Parece que tu búsqueda fue más épica que esta página!',
      duration: 4000,
    });

    const toastTimeout = setTimeout(() => {
      toast.error('Página no encontrada', {
        description: 'La página que buscas no existe o fue movida.',
        duration: Infinity,
      });
    }, 5000);

    return () => {
      toast.dismiss(firstToast);
      clearTimeout(toastTimeout);
    };
  }, []);

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
