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

export async function getEducation() {
    return client.fetch(
        groq`*[_type == "education"]{
            _id,
            name,
            studyCenter,
            "certificateURL": certificateURL.asset->url,
            description,
            years,
        }`
    );
}

export async function getProjects() {
    return client.fetch(
        groq`*[_type == "project"]{
            _id, 
            name,
            "slug": slug.current,
            shortDescription,
            coverImage {
                alt,
                "image": asset->url,
                "imageWidth": asset->metadata.dimensions.width,
                "imageHeight": asset->metadata.dimensions.height
            },
            githubUrl,
            projectUrl,
            categories[]-> { name, "slug": slug.current }
        }`
    );
}

export async function getSingleProject(slug) {
    const wpm = 180;
    const meanWordCharacterCount = 5;

    return client.fetch(
        groq`*[_type == "project" && slug.current == $slug][0]{
            _id,
            name,
            coverImage {
                alt,
                "image": asset->url,
                "imageWidth": asset->metadata.dimensions.width,
                "imageHeight": asset->metadata.dimensions.height
            },
            githubUrl,
            projectUrl,
            description[]{
                ...,
                _type == "image" => {
                    "image": asset->url,
                    alt,
                    "imageWidth": asset->metadata.dimensions.width,
                    "imageHeight": asset->metadata.dimensions.height
                }
            },
            "headings": description[style in ["h2", "h3"]],
            "estimatedReadingTime": round(length(pt::text(description)) / ${meanWordCharacterCount} / ${wpm}),
            categories[]-> { name, "slug": slug.current },
            "date": date,
        }`,
        { slug }
    );
}

export async function getComments(postId, commentsOrder) {
    return client.fetch(
        groq`*[_type == "comment" && relatedDocument._ref == $postId] | order(_createdAt ${commentsOrder}){
            _id,
            name,
            comment,
            _createdAt,
        }`,
        { postId }
    );
}

export function getCommentsListen(postId, commentsOrder) {
    return client.listen(
        groq`*[_type == "comment" && relatedDocument._ref == $postId] | order(_createdAt ${commentsOrder}){
            _id,
            name,
            comment,
            _createdAt,
        }`,
        { postId }
    );
}

export async function getCategories() {
    return client.fetch(
      groq`*[_type == "category"]{
        _id,
        name,
        "slug": slug.current
      }`
    );
}

export async function getPostsBySlug(slug) {
    return client.fetch(
        groq`*[_type in ["project", "article"] && $slug in categories[]->slug.current]{
            _id, 
            name,
            "slug": "/" + select(_type == "article" => "blog", _type == "project" => "projects") + "/" + slug.current,
            shortDescription,
            coverImage {
                alt,
                "image": asset->url,
                "imageWidth": asset->metadata.dimensions.width,
                "imageHeight": asset->metadata.dimensions.height
            },
            githubUrl,
            projectUrl,
            categories[]-> { name, "slug": slug.current },
        }`,
        { slug }
    );
}

export async function getArticles() {
    return client.fetch(
        groq`*[_type == "article"]{
            _id, 
            name,
            "slug": slug.current,
            shortDescription,
            coverImage {
                alt,
                "image": asset->url,
                "imageWidth": asset->metadata.dimensions.width,
                "imageHeight": asset->metadata.dimensions.height
            },
            categories[]-> { name, "slug": slug.current },
            "date": date,
        }`
    );
}

export async function getSingleArticle(slug) {
    const wpm = 180;
    const meanWordCharacterCount = 5;

    return client.fetch(
        groq`*[_type == "article" && slug.current == $slug][0]{
            _id,
            name,
            coverImage {
                alt,
                "image": asset->url,
                "imageWidth": asset->metadata.dimensions.width,
                "imageHeight": asset->metadata.dimensions.height
            },
            description[]{
                ...,
                _type == "image" => {
                    "image": asset->url,
                    alt,
                    "imageWidth": asset->metadata.dimensions.width,
                    "imageHeight": asset->metadata.dimensions.height
                }
            },
            "headings": description[style in ["h2", "h3"]],
            "estimatedReadingTime": round(length(pt::text(description)) / ${meanWordCharacterCount} / ${wpm}),
            categories[]-> { name, "slug": slug.current },
            "date": date,
        }`,
        { slug }
    );
}
