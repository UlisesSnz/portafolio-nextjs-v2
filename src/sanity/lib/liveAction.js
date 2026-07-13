'use server';

import { updateTag } from 'next/cache';
import { parseTags } from 'next-sanity/live';

export async function refreshPublishedContent(unsafeTags) {
  const { tags } = parseTags(unsafeTags);

  for (const tag of tags) {
    updateTag(tag);
  }

  return 'refresh';
}
