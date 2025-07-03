import { defineQuery } from 'next-sanity';

/* Shared */
export const seoFields = `{
  title,
  description,
  "image": image.asset->url,
  keywords
}`;

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

/* Categories */
const categoryFields = `
  _id,
  _key,
  title,
  icon,
  description,
  "slug": slug.current,
  "icon": icon.svg,
  "seo": ${seoFields}
`;

;

export const categoryBySlugQuery = defineQuery(`*[_type == "category"  && slug.current == $slug][0] { ${categoryFields} }`);

/* Store */
const storeFields = `{
  _id,
  _createdAt,
  title,
  "slug": slug.current,
  "logo": logo.asset->url,
  categories[]->{ ${categoryFields}},
  solution[]{
    _key,
    name,
    description,
    price,
    fiftyPlus,
    "image": image.asset->url
  },
  about[],
  "aboutImage": aboutImage.asset->url,
  contact {
    address,
    phone,
    email,
    instagram
  }
}`;
export const categoriesQuery = defineQuery(`*[_type == "category"] | order(title asc) {
  ${categoryFields},
  "storesCount": count(*[_type == "store" && references(^._id)]),
  "fiftyPlusStoresCount": count(*[_type == "store" && references(^._id) && count(solution[fiftyPlus == true]) > 0]),
  "stores": *[_type == "store" && references(^._id)] ${storeFields},
  subCategories[]->{
    ${categoryFields}
  },
}`);

export const storesQuery = defineQuery(`*[_type == "store"] ${storeFields}`);
export const storeBySlugQuery = defineQuery(`*[_type == "store" && slug.current == $slug][0] ${storeFields}`);
export const storesByCategoryIdQuery = defineQuery(`*[_type == "store" && $categoryId in categories[]._ref] ${storeFields}`);

/* Site Settings */
export const siteSettingsFields = `{
  aboutUs {
    description,
    "image": image.asset->url
  }
}`;

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings"][0] ${siteSettingsFields}`);
