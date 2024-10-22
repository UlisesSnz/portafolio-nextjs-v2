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
                    className="rounded-xl w-full h-auto"
                />
            );
        },
    },
};

export default PortableTextComponents;
