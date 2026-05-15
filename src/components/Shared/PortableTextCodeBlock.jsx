import { bundledLanguages, codeToHtml } from 'shiki';
import PortableTextCodeCopyButton from './PortableTextCodeCopyButton';

const LANGUAGE_ALIASES = {
  csharp: 'c#',
  cs: 'c#',
  javascript: 'js',
  md: 'markdown',
  plaintext: 'txt',
  py: 'python',
  shell: 'bash',
  text: 'txt',
  ts: 'typescript',
  yml: 'yaml',
  zsh: 'bash',
};

const LIGHT_THEME = 'one-light';
const DARK_THEME = 'one-dark-pro';

const isBundledLanguage = (language) => (
  Object.prototype.hasOwnProperty.call(bundledLanguages, language)
);

const FALLBACK_LANGUAGE = ['txt', 'plaintext', 'text'].find((language) => isBundledLanguage(language));

const formatLanguageLabel = (language) => {
  if (!language) {
    return 'text';
  }

  return language
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const getPlainCodeHtml = (code) => (
  `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`
);

const resolveLanguage = (language) => {
  const normalizedLanguage = (language || 'text').trim().toLowerCase();
  const aliasedLanguage = LANGUAGE_ALIASES[normalizedLanguage] || normalizedLanguage;

  if (isBundledLanguage(aliasedLanguage)) {
    return aliasedLanguage;
  }

  if (isBundledLanguage(normalizedLanguage)) {
    return normalizedLanguage;
  }

  return FALLBACK_LANGUAGE;
};

const getHighlightedCode = async (code, language) => {
  const resolvedLanguage = resolveLanguage(language);

  if (!resolvedLanguage) {
    const plainCodeHtml = getPlainCodeHtml(code);

    return {
      darkHtml: plainCodeHtml,
      lightHtml: plainCodeHtml,
    };
  }

  try {
    const [lightHtml, darkHtml] = await Promise.all([
      codeToHtml(code, {
        lang: resolvedLanguage,
        theme: LIGHT_THEME,
      }),
      codeToHtml(code, {
        lang: resolvedLanguage,
        theme: DARK_THEME,
      }),
    ]);

    return {
      darkHtml,
      lightHtml,
    };
  } catch {
    const plainCodeHtml = getPlainCodeHtml(code);

    return {
      darkHtml: plainCodeHtml,
      lightHtml: plainCodeHtml,
    };
  }
};

const PortableTextCodeBlock = async ({ value }) => {
  const code = value?.code || '';
  const language = value?.language || 'text';
  const filename = value?.filename;

  if (!code.trim()) {
    return null;
  }

  const { darkHtml, lightHtml } = await getHighlightedCode(code, language);

  return (
    <figure className="my-10 overflow-hidden rounded-xl border border-dark/20 bg-light text-dark shadow-sm dark:border-light/20 dark:bg-dark dark:text-light sm:my-8">
      <figcaption className="flex items-center justify-between gap-3 border-b border-dark/15 px-4 py-2 dark:border-light/15">
        <div className="flex items-center gap-2 overflow-hidden text-xs text-dark/80 dark:text-light/80">
          <span className="rounded-md bg-dark/10 px-2 py-1 font-semibold uppercase tracking-wide dark:bg-light/10">
            {formatLanguageLabel(language)}
          </span>
          {filename && (
            <span className="truncate text-[12px] text-dark/65 dark:text-light/70">{filename}</span>
          )}
        </div>
        <PortableTextCodeCopyButton code={code} />
      </figcaption>

      <div
        className="overflow-x-auto px-4 py-4 text-sm leading-6 dark:hidden [&>pre]:m-0 [&>pre]:!bg-transparent [&>pre]:p-0 [&_code]:font-mono [&_code]:text-sm"
        dangerouslySetInnerHTML={{ __html: lightHtml }}
      />
      <div
        className="hidden overflow-x-auto px-4 py-4 text-sm leading-6 dark:block [&>pre]:m-0 [&>pre]:!bg-transparent [&>pre]:p-0 [&_code]:font-mono [&_code]:text-sm"
        dangerouslySetInnerHTML={{ __html: darkHtml }}
      />
    </figure>
  );
};

export default PortableTextCodeBlock;
