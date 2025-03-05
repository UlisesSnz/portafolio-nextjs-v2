import { defineField } from 'sanity';

const article = {
    name: "article",
    title: "Article",
    description: "Article Schema",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            description: "Enter the name of the article",
        },
        defineField({
            name: "shortDescription",
            title: "Short Description",
            type: "text",
            rows: 3,
            validation: (rule) => rule.max(180).required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            description: "Add a custom slug for the URL or generate one from the name",
            options: { source: "name" },
            validation: (rule) => rule.required(),
        }),
        {
            name: "coverImage",
            title: "Cover Image",
            type: "image",
            description: "Upload a cover image for this article",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alt",
                    type: "string",
                },
            ],
        },
        {
            name: "description",
            title: "Description",
            type: "array",
            description: "Write a full description about this article",
            of: [
                {
                    type: "block"
                },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            title: "Alt",
                            type: "string",
                        }
                    ]
                }
            ],
        },
        {
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: [{ type: "category" }] }],
        },
        defineField({
            name: "date",
            title: "Date",
            type: "date",
            description: "Enter the date of the article",
            validation: (rule) => rule.required(),
            initialValue: () => new Date().toISOString().split('T')[0],
        }),
    ],
};

export default article;
