import type { CategorySchema } from '@/libs/sanity/types';
import { sanityFetch } from '@/libs/sanity/live';
import { categoriesQuery, storesQuery } from '@/libs/sanity/queries';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type IIndexProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IIndexProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function Index(props: IIndexProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  const categoriesRes = await sanityFetch({
    query: categoriesQuery,
  }) as { data: CategorySchema[] };
  const categories = categoriesRes?.data as CategorySchema[];

  const storeRes = await sanityFetch({
    query: storesQuery,
  }) as { data: CategorySchema[] };
  const stores = storeRes?.data as CategorySchema[];

  return (
    <>
      <h1>{t('meta_title')}</h1>
      <div>
        <h4>Categorias</h4>
        {categories.map(category => (
          <div key={category._id}>
            <h2>{category.title}</h2>
            <p>{category.description}</p>
          </div>
        ))}

        <hr />

        <h4>Lojas Cadastradas</h4>
        {stores.map(store => (
          <div key={store._id}>
            <h2>{store.title}</h2>
            <p>{store.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};
