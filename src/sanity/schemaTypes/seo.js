import { defineField, defineType } from 'sanity';

const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Título SEO (opcional)',
      type: 'string',
      description: 'Título que se mostrará en buscadores y al compartir la página. Si lo dejas vacío, se usará el título normal del contenido.',
      validation: (rule) => rule.max(60).warning('Se recomiendan hasta 60 caracteres.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Descripción utilizada por buscadores y vistas previas sociales.',
      validation: (rule) => rule.max(160).warning('Se recomiendan hasta 160 caracteres.'),
    }),
    defineField({
      name: 'image',
      title: 'Imagen Open Graph',
      type: 'image',
      description: 'Imagen para compartir en redes sociales. Tamaño recomendado: 1200 × 630 px.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) => rule.required().error('Agrega un texto alternativo para la imagen.'),
        }),
      ],
    }),
  ],
});

export default seo;
