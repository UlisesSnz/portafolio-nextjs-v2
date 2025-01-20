const tag = {
    name: "tag",
    title: "Tag",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Tag Name",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "name",
            },
        },
    ],
}

export default tag;
