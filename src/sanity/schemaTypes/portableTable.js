import { defineField } from 'sanity';

const tableAlignmentOptions = [
    { title: 'Left', value: 'left' },
    { title: 'Center', value: 'center' },
    { title: 'Right', value: 'right' },
];

const portableTable = {
    name: 'portableTable',
    title: 'Table',
    type: 'object',
    fields: [
        defineField({
            name: 'table',
            title: 'Table Data',
            type: 'table',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'hasHeader',
            title: 'Use first row as header',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'columnAlignments',
            title: 'Column alignment',
            description: 'Set alignment by column order (first, second, third, etc).',
            type: 'array',
            options: {
                sortable: false,
            },
            of: [
                {
                    type: 'string',
                    options: {
                        list: tableAlignmentOptions,
                    },
                },
            ],
        }),
    ],
    preview: {
        select: {
            rows: 'table.rows',
            hasHeader: 'hasHeader',
        },
        prepare({ rows, hasHeader }) {
            const rowCount = Array.isArray(rows) ? rows.length : 0;
            const columnCount = rowCount > 0 && Array.isArray(rows[0]?.cells)
                ? rows[0].cells.length
                : 0;
            const headerLabel = hasHeader === false ? 'No header' : 'Header enabled';

            return {
                title: 'Table',
                subtitle: `${rowCount} rows x ${columnCount} columns - ${headerLabel}`,
            };
        },
    },
};

export default portableTable;