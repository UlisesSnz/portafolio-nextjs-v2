'use client';

import { useState } from 'react';

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

const PortableTextCodeCopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

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
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copiar codigo"
      className="rounded-md border border-dark/20 bg-dark/5 px-2.5 py-1 text-xs font-medium text-dark/85 transition hover:bg-dark/10 dark:border-light/20 dark:bg-light/10 dark:!text-light dark:hover:bg-light/15"
    >
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  );
};

export default PortableTextCodeCopyButton;
