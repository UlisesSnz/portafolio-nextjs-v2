import { defineField } from 'sanity';

const project = {
    name: "project",
    title: "Project",
    description: "Project Schema",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            description: "Enter the name of the project",
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
            description: "Upload a cover image for this project",
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
            name: "githubUrl",
            title: "GitHub URL",
            type: "url",
        },
        {
            name: "projectUrl",
            title: "Project URL",
            type: "url",
        },
        {
            name: "description",
            title: "Description",
            type: "array",
            description: "Write a full description about this project",
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
            description: "Enter the date of the project",
            validation: (rule) => rule.required(),
        }),
    ],
};

export default project;
