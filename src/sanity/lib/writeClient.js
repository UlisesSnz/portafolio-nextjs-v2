import 'server-only';

import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    throw new Error('Falta configurar SANITY_API_WRITE_TOKEN.');
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}
