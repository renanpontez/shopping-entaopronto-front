import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import React from 'react';

type PortableTextProps = {
  value: any;
};

const PortableTextRenderer: React.FC<PortableTextProps> = ({ value }) => {
  if (!value) {
    return null;
  }

  return (
    <PortableText
      value={value}
      components={{
        block: {
          h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold my-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold my-2">{children}</h3>,
          normal: ({ children }) => <p className="text-base leading-relaxed my-2">{children}</p>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-400 pl-4 italic">{children}</blockquote>
          ),
        },
        list: {
          bullet: ({ children }) => <ul className="list-disc list-inside my-2">{children}</ul>,
          number: ({ children }) => <ol className="list-decimal list-inside my-2">{children}</ol>,
        },
        listItem: {
          bullet: ({ children }) => <li className="ml-4">{children}</li>,
          number: ({ children }) => <li className="ml-4">{children}</li>,
        },
        marks: {
          strong: ({ children }) => <strong className="font-bold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          link: ({ children, value }) => (
            <a
              href={value?.href}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        },
        types: {
          image: ({ value }) => (
            <div className="my-4">
              <Image
                src={value.asset.url}
                alt={value.alt || 'Sanity Image'}
                width={600}
                height={400}
                className="rounded-md"
              />
            </div>
          ),
        },
      }}
    />
  );
};

export default PortableTextRenderer;
