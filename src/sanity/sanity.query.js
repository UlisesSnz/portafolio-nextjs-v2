import 'server-only';

import { groq } from 'next-sanity';
import { sanityFetch } from './lib/live';
import { SEO_DEFAULT_DOCUMENT_ID, SEO_PAGE_BY_KEY } from './seoPages';

async function fetchPublished(query, params = {}) {
    const { data } = await sanityFetch({
        query,
        params,
        perspective: 'published',
        stega: false,
    });

    return data;
}

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

    return fetchPublished(
        PAGE_SEO_QUERY,
        { pageId: page.documentId, defaultId: SEO_DEFAULT_DOCUMENT_ID }
    );
}

export async function getDefaultSeo() {
    return fetchPublished(
        PAGE_SEO_QUERY,
        { pageId: SEO_DEFAULT_DOCUMENT_ID, defaultId: SEO_DEFAULT_DOCUMENT_ID }
    );
}

export async function getCategorySeo(slug) {
    return fetchPublished(
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
        }
    );
}

export async function getProfile() {
    return fetchPublished(
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
        {}
    );
}

export async function getJob() {
    return fetchPublished(
        groq`*[_type == "job"]{
            _id,
            name,
            jobTitle,
            location,
            url,
            description,
            years,
        }`,
        {}
    );
}

export async function getEducation() {
    return fetchPublished(
        groq`*[_type == "education"]{
            _id,
            name,
            studyCenter,
            "certificateURL": certificateURL.asset->url,
            description,
            years,
        }`,
        {}
    );
}

export async function getProjects() {
    return fetchPublished(
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
        {}
    );
}

export async function getSingleProject(slug) {
    const wpm = 180;
    const meanWordCharacterCount = 5;

    return fetchPublished(
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
        { slug }
    );
}

export async function getCategories() {
    return fetchPublished(
      groq`*[_type == "category"]{
        _id,
        name,
        "slug": slug.current
            }`,
            {}
    );
}

export async function getPostsBySlug(slug) {
    return fetchPublished(
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
        { slug }
    );
}

export async function getArticles() {
    return fetchPublished(
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
        {}
    );
}

export async function getSingleArticle(slug) {
    const wpm = 180;
    const meanWordCharacterCount = 5;

    return fetchPublished(
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
        { slug }
    );
}

export async function getRecentPosts() {
    return fetchPublished(
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
        {}
    );
}

export async function getArticleSlugs() {
    return fetchPublished(groq`*[_type == "article" && defined(slug.current)]{
        "slug": slug.current
    }`);
}

export async function getProjectSlugs() {
    return fetchPublished(groq`*[_type == "project" && defined(slug.current)]{
        "slug": slug.current
    }`);
}
