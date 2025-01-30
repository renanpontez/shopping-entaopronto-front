import type { StoreSchemaResponse } from '@/libs/sanity/types';
import { sanityFetch } from '@/libs/sanity/live';
import { storesByCategorySlugQuery } from '@/libs/sanity/queries';
import Image from 'next/image';

export default async function StoresByCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const storesRes = await sanityFetch({
    query: storesByCategorySlugQuery,
    params: { slug },
  }) as { data: StoreSchemaResponse[] };

  const stores = storesRes?.data;

  if (!stores || stores.length === 0) {
    return (
      <div>
        <h1>Nenhuma loja encontrada</h1>
        <p>Não existem lojas cadastradas nesta categoria...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Lojas desta categoria</h1>
      {stores.map(store => (
        <div key={store._id} className="mb-8">
          <h2 className="text-xl font-bold">{store.title}</h2>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Produtos e Serviços</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {store.productsOrServices?.map(item => (
                <div key={item._key} className="border p-4 rounded-lg">
                  {item.image && (
                    <Image src={item.image} alt="store-image" width={300} height={300} className="w-full h-48 object-cover rounded-md" />
                  )}
                  <h4 className="font-bold mt-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="font-semibold mt-2">
                    R$
                    {item.price}
                  </p>
                  {item.whatsappContact && (
                    <a
                      href={`https://wa.me/${item.whatsappContact}`}
                      className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contato WhatsApp
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
