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
  // const t = await getTranslations({
  //   locale,
  //   namespace: 'Index',
  // });

  const categoriesRes = await sanityFetch({
    query: categoriesQuery,
  }) as { data: CategorySchema[] };
  const categories = categoriesRes?.data as CategorySchema[];

  const storeRes = await sanityFetch({
    query: storesQuery,
  }) as { data: CategorySchema[] };
  const stores = storeRes?.data as CategorySchema[];

  return (
    <div className="flex flex-col gap-20 container">
      <section>
        <h3>Categorias</h3>
        <ul>
          {categories.map(category => (
            <li key={category._id}>
              {category.title}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h3>Lojas</h3>
        <ul>
          {stores.map(store => (
            <li key={store._id}>
              {store.title}
            </li>
          ))}
        </ul>
      </section>
      <section>
        {/* Quem somos */}
        <div className="flex">
          <div>
            <h3>Quem Somos</h3>
            <p>
              O Shopping EntãoPronto é um marketplace inovador que conecta você a diversas lojas e
              serviços exclusivos, garantindo a melhor experiência de compra online.
            </p>
          </div>
          <div>
            <img src="/assets/images/hero-img.svg" alt="Quem Somos" />
          </div>
        </div>
      </section>
      <section>
        {/* CTA Agility */}
        <div className="flex gap-10">
          <div>
            <h3>Transforme seu negócio com a Agility</h3>
            <p>
              Quer levar sua loja para o digital e alcançar novos clientes? A Agility tem a solução
              ideal para você!
            </p>
          </div>
          <div>
            <button>Saiba mais</button>
          </div>
        </div>
      </section>
      <section>
        {/* Contato */}
        <div>
          <h3>Entre em Contato</h3>
          <p>Fale conosco para tirar dúvidas ou saber mais sobre como podemos ajudar.</p>

          <form className="flex flex-col">
            <input type="text" placeholder="Nome" />
            <input type="email" placeholder="E-mail" />
            <textarea placeholder="Mensagem" />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </section>
    </div>
  );
};
