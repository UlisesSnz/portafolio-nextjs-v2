const PortableTextComponents = {
    types: {
        image: ({ value }) => {
            return (
                <img
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    src={value.image}
                    alt={value.alt || 'Imagen'}
                    width={value.imageWidth}
                    height={value.imageHeight}
                    className="rounded-xl w-full h-auto mb-8"
                />
            );
        },
    },
    block: {
        h2: ({ children }) => (
            <h2 className="font-bold text-4xl sm:text-2xl xs:text-xl mb-8 sm:mb-6">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="font-bold text-2xl sm:text-xl xs:text-lg mb-4 sm:mb-3">{children}</h3>
        ),
        normal: ({ children }) => (
            <p className="leading-7 mb-6 sm:mb-5">{children}</p>
        ),
    }
};

export default PortableTextComponents;
