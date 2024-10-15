const job = {
    name: "job",
    title: "Job",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Company Name",
            type: "string",
            description: "What is the name of the company?",
        },
        {
            name: "jobTitle",
            title: "Job Title",
            type: "string",
            description: "Enter the job title. E.g: Software Developer",
        },
        {
            name: "location",
            title: "Location",
            type: "string",
        },
        {
            name: "url",
            title: "Company Website",
            type: "url",
        },
        {
            name: "description",
            title: "Job Description",
            type: "text",
            rows: 3,
            description: "Write a brief description about this role",
        },
        {
            name: "years",
            title: "Years",
            type: "object",
            description: "Add your start and end year of this job",
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
                    title: "End Year",
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
};

export default job;
