import { groq } from 'next-sanity';
import { client } from './lib/client';

export async function getProfile() {
    return client.fetch(
        groq`*[_type == "profile"]{
            _id,
            fullName,
            headline,
            shortBiography,
            "resumeURL": resumeURL.asset->url,
            profileImage {
                alt,
                "image": asset->url,
                "imageWidth": asset->metadata.dimensions.width,
                "imageHeight": asset->metadata.dimensions.height
            },
            fullBiography,
            developerStatistic,
            skills,
        }`
    );
}

export async function getJob() {
    return client.fetch(
        groq`*[_type == "job"]{
            _id,
            name,
            jobTitle,
            location,
            url,
            description,
            years,
        }`
    );
}