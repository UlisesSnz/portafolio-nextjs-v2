import { groq } from 'next-sanity';
import { client } from './lib/client';
import { SEO_DEFAULT_DOCUMENT_ID, SEO_PAGE_BY_KEY } from './seoPages';

const DEFAULT_REVALIDATE_SECONDS = 300;
const DEFAULT_FETCH_OPTIONS = {
    next: { revalidate: DEFAULT_REVALIDATE_SECONDS },
};
const NO_STORE_FETCH_OPTIONS = {
    cache: 'no-store',
};

const PAGE_SEO_QUERY = groq`{
    "title": coalesce(
        *[_id == $pageId][0].seo.title,
        *[_id == $defaultId][0].seo.title
    ),
    "description": coalesce(
        *[_id == $pageId][0].seo.description,
        *[_id == $defaultId][0].seo.description
    ),
    "image": coalesce(
        *[_id == $pageId][0].seo.image,
        *[_id == $defaultId][0].seo.image
    )
}`;

export async function getPageSeo(pageKey) {
    const page = SEO_PAGE_BY_KEY[pageKey];

    if (!page) {
        throw new Error(`Página SEO no soportada: ${pageKey}`);
    }

    return client.fetch(
        PAGE_SEO_QUERY,
        { pageId: page.documentId, defaultId: SEO_DEFAULT_DOCUMENT_ID },
        DEFAULT_FETCH_OPTIONS
    );
}

export async function getDefaultSeo() {
    return client.fetch(
        PAGE_SEO_QUERY,
        { pageId: SEO_DEFAULT_DOCUMENT_ID, defaultId: SEO_DEFAULT_DOCUMENT_ID },
        DEFAULT_FETCH_OPTIONS
    );
}

export async function getCategorySeo(slug) {
    return client.fetch(
        groq`{
            "title": coalesce(
                *[_type == "category" && slug.current == $slug][0].seo.title,
                *[_type == "category" && slug.current == $slug][0].name
            ),
            "description": coalesce(
                *[_type == "category" && slug.current == $slug][0].seo.description,
                *[_id == $categoriesId][0].seo.description,
                *[_id == $defaultId][0].seo.description
            ),
            "image": coalesce(
                *[_type == "category" && slug.current == $slug][0].seo.image,
                *[_id == $categoriesId][0].seo.image,
                *[_id == $defaultId][0].seo.image
            )
        }`,
        {
            slug,
            categoriesId: SEO_PAGE_BY_KEY.categories.documentId,
            defaultId: SEO_DEFAULT_DOCUMENT_ID,
        },
        DEFAULT_FETCH_OPTIONS
    );
}

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
        }`,
        {},
        DEFAULT_FETCH_OPTIONS
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
        }`,
        {},
        DEFAULT_FETCH_OPTIONS
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
        }`,
        {},
        DEFAULT_FETCH_OPTIONS
    );
}

export async function getProjects() {
    return client.fetch(
        groq`*[_type == "project"] | order(date desc) {
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
            "date": date,
            categories[]-> { name, "slug": slug.current }
        }`,
        {},
        DEFAULT_FETCH_OPTIONS
    );
}

export async function getSingleProject(slug) {
    const wpm = 180;
    const meanWordCharacterCount = 5;

    return client.fetch(
        groq`*[_type == "project" && slug.current == $slug][0]{
            _id,
            name,
            shortDescription,
            "seo": {
                "title": coalesce(seo.title, name),
                "description": coalesce(seo.description, shortDescription),
                "image": coalesce(seo.image, coverImage)
            },
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
                    caption,
                    "imageWidth": asset->metadata.dimensions.width,
                    "imageHeight": asset->metadata.dimensions.height
                }
            },
            "headings": description[style in ["h2", "h3"]],
            "estimatedReadingTime": round(length(pt::text(description)) / ${meanWordCharacterCount} / ${wpm}),
            categories[]-> { name, "slug": slug.current },
            "date": date,
        }`,
        { slug },
        DEFAULT_FETCH_OPTIONS
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
        { postId },
        NO_STORE_FETCH_OPTIONS
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
            }`,
            {},
            DEFAULT_FETCH_OPTIONS
    );
}

export async function getPostsBySlug(slug) {
    return client.fetch(
        groq`*[_type in ["project", "article"] && $slug in categories[]->slug.current]{
            _id, 
            _type,
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
            "date": date,
            categories[]-> { name, "slug": slug.current },
        }`,
        { slug },
        DEFAULT_FETCH_OPTIONS
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
        }`,
        {},
        DEFAULT_FETCH_OPTIONS
    );
}

export async function getSingleArticle(slug) {
    const wpm = 180;
    const meanWordCharacterCount = 5;

    return client.fetch(
        groq`*[_type == "article" && slug.current == $slug][0]{
            _id,
            name,
            shortDescription,
            "seo": {
                "title": coalesce(seo.title, name),
                "description": coalesce(seo.description, shortDescription),
                "image": coalesce(seo.image, coverImage)
            },
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
                    caption,
                    "imageWidth": asset->metadata.dimensions.width,
                    "imageHeight": asset->metadata.dimensions.height
                }
            },
            "headings": description[style in ["h2", "h3"]],
            "estimatedReadingTime": round(length(pt::text(description)) / ${meanWordCharacterCount} / ${wpm}),
            categories[]-> { name, "slug": slug.current },
            "date": date,
        }`,
        { slug },
        DEFAULT_FETCH_OPTIONS
    );
}

export async function getRecentPosts() {
    return client.fetch(
        groq`*[_type in ["project", "article"]] | order(date desc) [0..4] {
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
            categories[]-> { name, "slug": slug.current },
            "date": date,
        }`,
        {},
        DEFAULT_FETCH_OPTIONS
    );
}
