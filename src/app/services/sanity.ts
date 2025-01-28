import { client } from '../../../sanityClient';

const storeQuery = `*[_type == "store"]{
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
    "image": image.asset->url,
  }
}`;

const categoryQuery = `*[_type == "category"]{
  _id,
  _createdAt,
  _updatedAt,
  _type,
  title,
  description,
  slug {
    current,
    _type,
  },
  seo {
    _type,
    title,
    description,
    keywords,
    "image": image.asset->url,
  }
}`;

export async function getCategories() {
  const posts = await client.fetch(categoryQuery);
  return posts;
}

export async function getStores() {
  const posts = await client.fetch(storeQuery);
  return posts;
}

export async function getStoresAndCategories() {
  const query = `{
  "stores": ${storeQuery},
  "categories": ${categoryQuery}
}`;
  const posts = await client.fetch(query);
  return posts;
}
