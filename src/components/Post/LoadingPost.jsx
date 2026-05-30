import Layout from '@/components/Shared/Layout';

const LoadingPost = () => {
    return (
        <div className="w-full mb-16 flex flex-col items-center justify-center">
            <Layout className="pt-16">
                <div className="max-w-full mx-auto lg:px-0 px-8">
                    <div className="flex flex-col items-center w-full mb-6">
                        <span className="w-3/4 sm:w-full h-32 mb-16 sm:mb-8 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                        <div className="flex w-full items-center justify-center my-6 sm:mb-2">
                            <span className="w-1/12 sm:w-2/12 h-5 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                            <span className="w-1/12 sm:w-2/12 h-5 bg-dark dark:bg-light rounded-lg animate-pulse mx-6"></span>
                            <span className="w-1/12 sm:w-2/12 h-5 bg-dark dark:bg-light rounded-lg animate-pulse mr-6"></span>
                            <span className="w-1/12 sm:w-2/12 h-5 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                        </div>
                        <span className="w-2/5 sm:w-4/5 h-5 sm:mb-2 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                    </div>
                    <div className="w-full h-[50vw] mb-8 bg-dark dark:bg-light rounded-lg animate-pulse"></div>
                    <div className="grid grid-cols-12 gap-y-8 gap-16 xl:gap-8 md:gap-x-0 mt-8">
                        <div className="col-span-4 lg:col-span-12">
                            <div className="w-full h-[10vw] sm:h-[75vw] bg-dark dark:bg-light rounded-lg animate-pulse"></div>
                        </div>
                        <div className="flex flex-col col-span-8 lg:col-span-12 gap-y-2">
                            <span className="w-full h-5 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                            <span className="w-full h-5 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                            <span className="w-full h-5 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                            <span className="w-full h-5 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                            <span className="w-full h-5 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                            <span className="w-full h-5 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                            <span className="w-full h-5 bg-dark dark:bg-light rounded-lg animate-pulse"></span>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default LoadingPost;
