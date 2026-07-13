import { groq } from 'next-sanity';
import { client } from './lib/client';

const commentsQuery = (commentsOrder) => groq`*[
  _type == "comment" && relatedDocument._ref == $postId
] | order(_createdAt ${commentsOrder}) {
  _id,
  name,
  comment,
  _createdAt,
}`;

export async function getComments(postId, commentsOrder) {
  return client.fetch(
    commentsQuery(commentsOrder),
    { postId },
    { cache: 'no-store' }
  );
}

export function getCommentsListen(postId, commentsOrder) {
  return client.listen(commentsQuery(commentsOrder), { postId });
}
