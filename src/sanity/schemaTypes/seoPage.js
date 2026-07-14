import { defineField, defineType } from 'sanity';
import { languageField } from './localization';

const seoPage = defineType({
  name: 'seoPage',
  title: 'SEO de página',
  type: 'document',
  fields: [
    languageField,
    defineField({
      name: 'seo',
      title: 'Metadatos',
      type: 'seo',
      validation: (rule) => rule.required().custom((value) =>
        value?.title && value?.description
          ? true
          : 'Cada página requiere título y descripción SEO.'
      ),
    }),
  ],
  preview: {
    select: {
      title: 'seo.title',
      media: 'seo.image',
      language: 'language',
    },
    prepare({ title, media, language }) {
      return {
        title: title || 'Configuración SEO',
        subtitle: language?.toUpperCase(),
        media,
      };
    },
  },
});

export default seoPage;
