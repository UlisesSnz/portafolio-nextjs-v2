const comment = {
    name: "comment",
    title: "Comment",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string",
            readOnly: true,
        },
        {
            name: "email",
            title: "Email",
            type: "string",
            readOnly: true,
        },
        {
            name: "comment",
            title: "Comment",
            type: "text",
            readOnly: true,
        },
        {
            name: "relatedDocument",
            title: "Related Document",
            type: "reference",
            to: [{ type: "article", type: "project" }],
        },
    ],
};

export default comment;
