import { syncTagInvalidateEventHandler } from '@sanity/functions';

export const handler = syncTagInvalidateEventHandler(async ({ event, done }) => {
    const revalidateUrl = process.env.REVALIDATE_URL;
    const revalidateSecret = process.env.REVALIDATE_SECRET;
    const tags = event.data.syncTags;

    if (!revalidateUrl || !revalidateSecret) {
        throw new Error('Faltan REVALIDATE_URL o REVALIDATE_SECRET.');
    }

    if (!Array.isArray(tags) || tags.length === 0) {
        throw new Error('El evento no contiene sync tags para invalidar.');
    }

    const response = await fetch(revalidateUrl, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${revalidateSecret}`,
            'content-type': 'application/json',
        },
        body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(`Vercel rechazó la invalidación (${response.status}): ${message}`);
    }

    const doneResponse = await done(tags);

    if (!doneResponse.ok) {
        throw new Error(`Sanity no confirmó la invalidación (${doneResponse.status}).`);
    }

    console.log(`Invalidación completada para ${tags.length} sync tags.`);
});
