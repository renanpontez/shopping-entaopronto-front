import { defineQuery } from 'next-sanity';

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

export const categoriesQuery = defineQuery(`
  *[_type == "category"]
`);

export const storesQuery = defineQuery(`
  *[_type == "store"]{
    _id,
    title,
    slug,
    "category": category->title,
    productsOrServices[]{
      _key,
      title,
      description,
      price,
      "image": image.asset->url
    },
    about,
    "image": image.asset->url,
    contact {
      address,
      phone,
      email
    }
  }     
`);
