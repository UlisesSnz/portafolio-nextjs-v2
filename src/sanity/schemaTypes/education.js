import { languageField, localizedPreview } from './localization';

const education = {
    name: "education",
    title: "Education",
    type: "document",
    fields: [
        languageField,
        {
            name: "name",
            title: "Knowledge Name",
            type: "string",
            description: "What did you study?",
            validation: (rule) => rule.required(),
        },
        {
            name: "studyCenter",
            title: "Study Center",
            type: "string",
            description: "Enter where you studied it. E.g: Udemy",
            validation: (rule) => rule.required(),
        },
        {
            name: "certificateURL",
            title: "Upload Certificate",
            type: "file",
        },
        {
            name: "description",
            title: "Knowledge Description",
            type: "text",
            rows: 3,
            description: "Write a brief description about you learned",
            validation: (rule) => rule.required(),
        },
        {
            name: "years",
            title: "Years",
            type: "object",
            description: "Add your start and end year of this learning",
            fields: [
                {
                    name: "startYear",
                    title: "Start Year",
                    type: "number",
                    initialValue: new Date().getFullYear(),
                    validation: (Rule) => Rule.required().min(2000).max(new Date().getFullYear()),
                },
                {
                    name: "endYear",
                    title: "End Year (Optional)",
                    type: "number",
                    validation: (Rule) => Rule.min(2000).max(new Date().getFullYear()),
                },
            ],
            options: {
                collapsed: false,
                collapsible: true,
                columns: 2,
            },
        },
    ],
    preview: {
        select: { title: 'name', subtitle: 'studyCenter', language: 'language' },
        prepare: localizedPreview,
    },
};

export default education;
