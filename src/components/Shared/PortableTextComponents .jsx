import { toPlainText } from 'next-sanity';
import slugify from 'slugify';

const PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <img
        src={value.image}
        alt={value.alt || 'Imagen'}
        width={value.imageWidth}
        height={value.imageHeight}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        className="rounded-xl w-full h-auto mb-8"
        loading="lazy"
        decoding="async"
        role="img"
      />
    ),
  },

  block: {
    h2: ({ children, value }) => {
      const slug = slugify(toPlainText(value), { lower: true });
      return (
        <h2 id={slug} className="font-bold text-4xl sm:text-2xl xs:text-xl mb-8 sm:mb-6 scroll-mt-4">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const slug = slugify(toPlainText(value), { lower: true });
      return (
        <h3 id={slug} className="font-bold text-2xl sm:text-xl xs:text-lg mb-4 sm:mb-3 scroll-mt-4">
          {children}
        </h3>
      );
    },
    normal: ({ children }) => (
      <p className="leading-7 mb-6 sm:mb-5 text-balance">{children}</p>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-6 pl-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-6 pl-4">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-2">{children}</li>
    ),
  },

  marks: {
    link: ({ children, value }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="underline underline-offset-4 hover:opacity-80 transition"
        >
          {children}
        </a>
      );
    },
  },
};

export default PortableTextComponents;
