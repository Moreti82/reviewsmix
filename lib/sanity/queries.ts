import { groq } from "next-sanity";

const imageFields = groq`
  ...,
  "asset": asset->{
    _id,
    url,
    metadata { dimensions { width, height, aspectRatio } }
  }
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage { ${imageFields} },
    rating,
    readingTime,
    publishedAt,
    featured
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...4] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage { ${imageFields} },
    rating,
    readingTime,
    publishedAt
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage { ${imageFields} },
    body,
    pros,
    cons,
    verdict,
    rating,
    readingTime,
    publishedAt,
    seoTitle,
    seoDescription
  }
`;

export const searchPostsQuery = groq`
  *[_type == "post" && (
    title match $term + "*" ||
    excerpt match $term + "*"
  )] | order(publishedAt desc)[0...12] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage { ${imageFields} },
    rating,
    readingTime,
    publishedAt
  }
`;
