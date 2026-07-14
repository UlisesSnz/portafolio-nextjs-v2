import { defineField } from 'sanity';
import { apiVersion } from '../env';

export const languageField = defineField({
  name: 'language',
  title: 'Idioma',
  type: 'string',
  readOnly: true,
  hidden: true,
  validation: (rule) => rule.required(),
});

export async function isUniqueSlugInLanguage(slug, context) {
  if (!slug) return true;

  const document = context.document;
  const language = document?.language;

  if (!document?._type || !language) return true;

  const publishedId = document._id.replace(/^drafts\./, '');
  const draftId = `drafts.${publishedId}`;
  const client = context.getClient({ apiVersion });

  const duplicateCount = await client.fetch(
    `count(*[
      _type == $type &&
      language == $language &&
      slug.current == $slug &&
      !(_id in [$publishedId, $draftId])
    ])`,
    {
      type: document._type,
      language,
      slug,
      publishedId,
      draftId,
    }
  );

  return duplicateCount === 0 || 'Este slug ya existe para el mismo idioma.';
}

export const localizedPreview = ({ title, subtitle, media, language }) => ({
  title: title || 'Sin título',
  subtitle: [subtitle, language?.toUpperCase()].filter(Boolean).join(' · '),
  media,
});
