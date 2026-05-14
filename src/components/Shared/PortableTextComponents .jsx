import Image from 'next/image';
import { toPlainText } from 'next-sanity';
import slugify from 'slugify';
import PortableTextCodeBlock from './PortableTextCodeBlock';

const tableAlignmentClassMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const normalizeTableRows = (rows) => {
  const safeRows = Array.isArray(rows) ? rows : [];
  const columnCount = safeRows.reduce((maxColumns, row) => {
    const cells = Array.isArray(row?.cells) ? row.cells : [];
    return Math.max(maxColumns, cells.length);
  }, 0);

  if (!safeRows.length || !columnCount) {
    return {
      columnCount: 0,
      rows: [],
    };
  }

  const normalizedRows = safeRows.map((row) => {
    const cells = Array.isArray(row?.cells) ? row.cells : [];
    const missingCells = Array(Math.max(0, columnCount - cells.length)).fill('');
    return [...cells, ...missingCells];
  });

  return {
    columnCount,
    rows: normalizedRows,
  };
};

const getColumnAlignmentClass = (columnAlignments, columnIndex) => {
  const alignment = Array.isArray(columnAlignments) ? columnAlignments[columnIndex] : undefined;
  return tableAlignmentClassMap[alignment] || tableAlignmentClassMap.left;
};

const renderTable = ({ rows, hasHeader = true, columnAlignments = [] }) => {
  const normalizedTable = normalizeTableRows(rows);

  if (!normalizedTable.rows.length || !normalizedTable.columnCount) {
    return null;
  }

  const useHeaderRow = hasHeader && normalizedTable.rows.length > 1;
  const headerCells = useHeaderRow ? normalizedTable.rows[0] : [];
  const bodyRows = useHeaderRow ? normalizedTable.rows.slice(1) : normalizedTable.rows;

  return (
    <div className="mb-8 overflow-x-auto rounded-xl border border-dark/15 bg-light/30 dark:border-light/20 dark:bg-dark/20">
      <table className="w-full min-w-[560px] border-collapse text-sm sm:min-w-[460px] sm:text-xs">
        {useHeaderRow && (
          <thead className="bg-dark/[0.04] dark:bg-light/[0.08]">
            <tr>
              {headerCells.map((cell, index) => {
                const alignmentClass = getColumnAlignmentClass(columnAlignments, index);

                return (
                  <th
                    key={`table-head-${index}`}
                    scope="col"
                    className={`border-b border-dark/15 px-4 py-3 font-semibold leading-6 text-dark dark:border-light/20 dark:text-light ${alignmentClass}`}
                  >
                    {cell || '-'}
                  </th>
                );
              })}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr
              key={`table-row-${rowIndex}`}
              className="border-b border-dark/10 even:bg-dark/[0.02] last:border-b-0 dark:border-light/15 even:dark:bg-light/[0.04]"
            >
              {row.map((cell, cellIndex) => {
                const alignmentClass = getColumnAlignmentClass(columnAlignments, cellIndex);

                return (
                  <td
                    key={`table-cell-${rowIndex}-${cellIndex}`}
                    className={`px-4 py-3 align-top leading-6 text-dark/90 dark:text-light/90 ${alignmentClass}`}
                  >
                    <span className="block break-words whitespace-pre-line">{cell || '-'}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PortableTextComponents = {
  types: {
    portableTable: ({ value }) => renderTable({
      rows: value?.table?.rows,
      hasHeader: value?.hasHeader !== false,
      columnAlignments: value?.columnAlignments,
    }),
    code: ({ value }) => (
      <PortableTextCodeBlock value={value} />
    ),
    image: ({ value }) => {
      const caption = value?.caption?.trim();

      return (
        <figure className="mb-8">
          <Image
            src={value.image}
            alt={value.alt || 'Imagen'}
            width={value.imageWidth || 1200}
            height={value.imageHeight || 675}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            className="rounded-xl w-full h-auto"
          />
          {caption && (
            <figcaption className="mt-3 text-sm leading-6 italic text-dark/70 dark:text-light/70">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },

  block: {
    h2: ({ children, value }) => {
      const slug = slugify(toPlainText(value), { lower: true });
      return (
        <h2 id={slug} className="font-bold text-4xl sm:text-2xl xs:text-xl mb-8 sm:mb-6 scroll-mt-4">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const slug = slugify(toPlainText(value), { lower: true });
      return (
        <h3 id={slug} className="font-bold text-2xl sm:text-xl xs:text-lg mb-4 sm:mb-3 scroll-mt-4">
          {children}
        </h3>
      );
    },
    normal: ({ children }) => (
      <p className="leading-7 mb-6 sm:mb-5 text-balance">{children}</p>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc list-outside space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal list-outside space-y-2">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="pl-1 leading-7">{children}</li>
    ),
    number: ({ children }) => (
      <li className="pl-1 leading-7">{children}</li>
    ),
  },

  marks: {
    code: ({ children }) => (
      <code className="rounded-md bg-dark/10 px-1.5 py-0.5 font-mono text-[0.95em] text-dark dark:bg-light/10 dark:text-light">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="underline underline-offset-4 hover:opacity-80 transition"
        >
          {children}
        </a>
      );
    },
  },
};

export default PortableTextComponents;
