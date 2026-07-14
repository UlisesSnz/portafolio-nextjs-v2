import { defineField, defineType } from 'sanity';
import { isUniqueSlugInLanguage, languageField, localizedPreview } from './localization';

const category = defineType({
    name: "category",
    title: "Category",
    type: "document",
    fields: [
        languageField,
        defineField({
            name: 'key',
            title: 'Clave estable',
            type: 'string',
            readOnly: ({ document }) => Boolean(document?.key),
            description: 'Identificador compartido entre traducciones para filtros y URLs con query params.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "name",
            title: "Category Name",
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
                isUnique: isUniqueSlugInLanguage,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
        }),
    ],
    preview: {
        select: { title: 'name', subtitle: 'key', language: 'language' },
        prepare: localizedPreview,
    },
});

export default category;
