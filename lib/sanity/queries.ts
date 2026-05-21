import { groq } from "next-sanity";

const categoryFields = groq`
  _id,
  title,
  "slug": slug.current,
  description,
  image
`;

const purchaseLinkFields = groq`
  label,
  url,
  platform,
  isAffiliate,
  priority
`;

const productFields = groq`
  _id,
  name,
  "slug": slug.current,
  brand,
  shortDescription,
  rating,
  priceRange,
  specs,
  purchaseLinks[]{ ${purchaseLinkFields} },
  images,
  category->{ _id, title, "slug": slug.current }
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    rating,
    readingTime,
    publishedAt,
    featured,
    category->{ _id, title, "slug": slug.current }
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    rating,
    readingTime,
    publishedAt,
    category->{ _id, title, "slug": slug.current }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    body,
    pros,
    cons,
    verdict,
    rating,
    readingTime,
    publishedAt,
    seoTitle,
    seoDescription,
    category->{ _id, title, "slug": slug.current },
    products[]->{ ${productFields} }
  }
`;

export const productsQuery = groq`
  *[_type == "product"] | order(name asc) {
    ${productFields}
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ${productFields}
  }
`;

export const categoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    ${categoryFields}
  }
`;

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    ${categoryFields}
  }
`;

export const postsByCategoryQuery = groq`
  *[_type == "post" && category->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    rating,
    readingTime,
    publishedAt,
    category->{ _id, title, "slug": slug.current }
  }
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $slug] | order(name asc) {
    ${productFields}
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
    coverImage,
    rating,
    readingTime,
    publishedAt,
    category->{ _id, title, "slug": slug.current }
  }
`;

export const searchProductsQuery = groq`
  *[_type == "product" && (
    name match $term + "*" ||
    shortDescription match $term + "*" ||
    brand match $term + "*"
  )] | order(name asc)[0...12] {
    ${productFields}
  }
`;
