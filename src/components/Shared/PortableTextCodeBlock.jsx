'use client';

import { useState } from 'react';

const formatLanguageLabel = (language) => {
  if (!language) {
    return 'text';
  }

  return language
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const copyTextToClipboard = async (text) => {
  if (!text) {
    return false;
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  if (typeof document === 'undefined') {
    return false;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'absolute';
  textArea.style.left = '-9999px';

  document.body.appendChild(textArea);
  textArea.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(textArea);

  return copied;
};

const PortableTextCodeBlock = ({ value }) => {
  const [copied, setCopied] = useState(false);
  const code = value?.code || '';
  const language = value?.language || 'text';
  const filename = value?.filename;

  if (!code.trim()) {
    return null;
  }

  const handleCopy = async () => {
    try {
      const copiedSuccessfully = await copyTextToClipboard(code);

      if (copiedSuccessfully) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch {
      setCopied(false);
    }
  };

  return (
    <figure className="mb-8 overflow-hidden rounded-xl border border-dark/20 bg-light text-dark shadow-sm dark:border-light/20 dark:bg-dark dark:text-light">
      <figcaption className="flex items-center justify-between gap-3 border-b border-dark/15 px-4 py-2 dark:border-light/15">
        <div className="flex items-center gap-2 overflow-hidden text-xs text-dark/80 dark:text-light/80">
          <span className="rounded-md bg-dark/10 px-2 py-1 font-semibold uppercase tracking-wide dark:bg-light/10">
            {formatLanguageLabel(language)}
          </span>
          {filename && (
            <span className="truncate text-[12px] text-dark/65 dark:text-light/70">{filename}</span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar codigo"
          className="rounded-md border border-dark/20 bg-dark/5 px-2.5 py-1 text-xs font-medium text-dark/85 transition hover:bg-dark/10 dark:border-light/20 dark:bg-light/10 dark:!text-light dark:hover:bg-light/15"
        >
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </figcaption>

      <pre className="overflow-x-auto px-4 py-4 text-sm leading-6">
        <code className="font-mono whitespace-pre">{code}</code>
      </pre>
    </figure>
  );
};

export default PortableTextCodeBlock;
