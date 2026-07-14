import { defineField } from 'sanity';
import { languageField, localizedPreview } from './localization';

const profile = {
    name: "profile",
    title: "Profile",
    type: "document",
    fieldsets: [
        { name: "home", title: "Shown On Home Page" },
        { name: "about", title: "Shown On About Page" },
    ],
    fields: [
        languageField,
        defineField({
            name: "fullName",
            title: "Full Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "headline",
            title: "Headline",
            type: "string",
            description: "In one short sentence, what do you do?",
            fieldset: "home",
            validation: (Rule) => Rule.required().min(15).max(50),
        }),
        {
            name: "shortBiography",
            title: "Short Biography",
            type: "text",
            rows: 4,
            fieldset: "home",
        },
        {
            name: "resumeURL",
            title: "Upload Resume",
            type: "file",
            fieldset: "home",
        },
        {
            name: "profileImage",
            title: "Profile Image",
            type: "image",
            description: "Upload a profile picture",
            fieldset: "about",
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
            name: "fullBiography",
            title: "Full Biography",
            type: "array",
            fieldset: "about",
            of: [
                { 
                    type: "block" 
                },
                { 
                    type: "portableTable" 
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
            ],
        },
        {
            name: "developerStatistic",
            title: "Developer Statistic",
            type: "object",
            description: "Add your developer statistics",
            fieldset: "about",
            fields: [
                {
                    name: "technologiesLearned",
                    title: "Technologies Learned",
                    type: "number",
                    initialValue: 0,
                    validation: (Rule) => Rule.required().min(1).max(100),
                },
                {
                    name: "completedProjects",
                    title: "Completed Projects",
                    type: "number",
                    initialValue: 0,
                    validation: (Rule) => Rule.required().min(1).max(100),
                },
                {
                    name: "programmingLanguagesLearned",
                    title: "Programming Languages Learned",
                    type: "number",
                    initialValue: 0,
                    validation: (Rule) => Rule.required().min(1).max(100),
                },
            ],
            options: {
                collapsed: false,
                collapsible: true,
                columns: 2,
            },
        },
        {
            name: "skills",
            title: "Skills",
            type: "array",
            description: "Add a list of skills",
            fieldset: "about",
            of: [{ type: "string" }],
        },
    ],
    preview: {
        select: { title: 'fullName', subtitle: 'headline', language: 'language' },
        prepare: localizedPreview,
    },
};

export default profile;
