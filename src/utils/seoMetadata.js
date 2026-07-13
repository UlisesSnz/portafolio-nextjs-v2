import { getPageSeo } from '@/sanity/sanity.query';
import { urlFor } from '@/sanity/lib/image';
import siteMetadata from '@/utils/siteMetaData';

const PAGE_METADATA_DEFAULTS = {
  home: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    pathname: '/',
    absoluteTitle: true,
  },
  about: {
    title: 'Sobre mí',
    description: 'Conoce más sobre mi trayectoria profesional y personal.',
    pathname: '/about',
  },
  contact: {
    title: 'Contáctame',
    description: `Contáctame a través del formulario disponible en esta página o envíame un correo electrónico a ${siteMetadata.email}`,
    pathname: '/contact',
  },
  projects: {
    title: 'Proyectos',
    description: 'Conoce algunos proyectos que muestran mi habilidad en desarrollo web.',
    pathname: '/projects',
  },
  blog: {
    title: 'Blog',
    description: 'Lee artículos, tutoriales y experiencias sobre desarrollo web en mi blog personal.',
    pathname: '/blog',
  },
  categories: {
    title: 'Categorías',
    description: 'Explora mis artículos y proyectos organizados por categoría.',
    pathname: '/search',
  },
};

const resolveImageUrl = (image) => {
  if (!image) {
    return undefined;
  }

  if (typeof image === 'string') {
    return image;
  }

  if (typeof image.image === 'string') {
    return image.image;
  }

  if (!image.asset) {
    return undefined;
  }

  return urlFor(image).width(1200).height(630).fit('crop').url();
};

export function buildMetadata({
  seo,
  title,
  description,
  pathname,
  type = 'website',
  absoluteTitle = false,
}) {
  const resolvedTitle = seo?.title || title || siteMetadata.title;
  const resolvedDescription = seo?.description || description || siteMetadata.description;
  const canonical = new URL(pathname || '/', `${siteMetadata.siteUrl}/`).toString();
  const imageUrl = resolveImageUrl(seo?.image);
  const imageAlt = seo?.image?.alt || resolvedTitle;

  const openGraph = {
    title: resolvedTitle,
    description: resolvedDescription,
    url: canonical,
    siteName: siteMetadata.title,
    locale: siteMetadata.locale,
    type,
  };

  const twitter = {
    card: 'summary_large_image',
    title: resolvedTitle,
    description: resolvedDescription,
  };

  if (imageUrl) {
    openGraph.images = [{
      url: imageUrl,
      width: 1200,
      height: 630,
      alt: imageAlt,
    }];
    twitter.images = [imageUrl];
  }

  return {
    title: absoluteTitle ? { absolute: resolvedTitle } : resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical },
    openGraph,
    twitter,
  };
}

export async function getStaticPageMetadata(pageKey) {
  const defaults = PAGE_METADATA_DEFAULTS[pageKey];

  if (!defaults) {
    throw new Error(`No existen metadatos predeterminados para: ${pageKey}`);
  }

  let seo;

  try {
    seo = await getPageSeo(pageKey);
  } catch (error) {
    console.error(`No fue posible cargar el SEO de ${pageKey}.`, error);
  }

  return buildMetadata({ seo, ...defaults });
}
