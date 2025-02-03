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
    "category": category->,
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

// export const storesAndCategoriesQuery = defineQuery(`{
//   "stores": *[_type == "store"]{
//     _id,
//     title,
//     slug,
//     "category": category->title,
//     productsOrServices[]{
//       _key,
//       title,
//       description,
//       price,
//       "image": image.asset->url
//     },
//     about,
//     "image": image.asset->url,
//     contact {
//       address,
//       phone,
//       email
//     }
//   },
//   "categories": *[_type == "category"]
// }`);

export const storeBySlugQuery = defineQuery(`
  *[_type == "store" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    _createdAt,
    _updatedAt,
    productsOrServices[]{
      _key,
      name,
      description,
      price,
      isProduct,
      whatsappContact,
      category->{
        _ref,
        _type
      },
      "image": image.asset->url
    }
  }
`);

export const storesByCategorySlugQuery = defineQuery(`
  *[_type == "store" && category._ref == $slug]{
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
