import { defineQuery } from 'next-sanity';

/* Settings */
export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

/* Categories */
const categoryFields = `
  ...,
  "slug": slug.current
`;

export const categoriesQuery = defineQuery(`*[_type == "category"] {
  ${categoryFields},
  "storesCount": count(*[_type == "store" && references(^._id)])
}`);
export const categoriesBySlugQuery = defineQuery(`*[_type == "category"  && slug.current == $slug][0] { ${categoryFields} }`);

/* Store */
const storeFields = `{
  _id,
  title,
  "slug": slug.current,
  "category": category->,
  productsOrServices[]{
    _key,
    name,
    description,
    price,
    "image": image.asset->url
  },
  about,
  "image": image.asset->url,
  contact {
    address,
    phone,
    email,
    instagram
  }
}`;

export const storesQuery = defineQuery(`*[_type == "store"] ${storeFields}`);
export const storeBySlugQuery = defineQuery(`*[_type == "store" && slug.current == $slug][0] ${storeFields}`);
export const storesByCategoryIdQuery = defineQuery(`*[_type == "store" && category._ref == $categoryId] ${storeFields}`);
