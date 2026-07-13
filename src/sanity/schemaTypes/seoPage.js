import { defineField, defineType } from 'sanity';

const normalizeDocumentId = (documentId = '') => documentId.replace(/^drafts\./, '');

const seoPage = defineType({
  name: 'seoPage',
  title: 'SEO de página',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'Metadatos',
      type: 'seo',
      validation: (rule) => rule.custom((value, context) => {
        if (normalizeDocumentId(context.document?._id) !== 'seo-default') {
          return true;
        }

        if (!value?.description || !value?.image) {
          return 'Los valores predeterminados requieren descripción e imagen Open Graph.';
        }

        return true;
      }),
    }),
  ],
  preview: {
    select: {
      title: 'seo.title',
      media: 'seo.image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Configuración SEO',
        media,
      };
    },
  },
});

export default seoPage;
