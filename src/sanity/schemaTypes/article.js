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
            name: "openGraphDescription",
            title: "Open Graph Description",
            type: "text",
            description: "Description used when sharing this article on social media.",
            rows: 3,
            validation: (rule) => rule.max(200),
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
        defineField({
            name: "openGraphImage",
            title: "Open Graph Image",
            type: "image",
            description: "Image used in social previews. Recommended size: 1200x630 px.",
            options: { hotspot: true },
            fields: [
                defineField({
                    name: "alt",
                    title: "Alt",
                    type: "string",
                }),
            ],
        }),
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
                    type: "portableTable",
                },
                {
                    type: "code",
                    initialValue: {
                        language: "text",
                    },
                    options: {
                        withFilename: true,
                        languageAlternatives: [
                            { title: "Text", value: "text" },
                            { title: "Javascript", value: "javascript" },
                            { title: "Typescript", value: "typescript" },
                            { title: "TSX", value: "tsx" },
                            { title: "HTML", value: "html" },
                            { title: "CSS", value: "css" },
                            { title: "Bash", value: "bash", mode: "sh" },
                            { title: "NPM", value: "npm", mode: "sh" },
                            { title: "Yarn", value: "yarn", mode: "sh" },
                            { title: "PNPM", value: "pnpm", mode: "sh" },
                            { title: "Python", value: "python" },
                            { title: "JSON", value: "json" },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            title: "Alt",
                            type: "string",
                        },
                        {
                            name: "caption",
                            title: "Caption",
                            type: "string",
                            description: "Optional caption shown below the image",
                            validation: (rule) => rule.max(180),
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
