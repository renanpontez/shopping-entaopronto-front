import type { Link } from '@/libs/sanity/types';
import type { CreateDataAttributeProps } from 'next-sanity';
import { dataset, projectId, studioUrl } from '@/libs/sanity/api';
import createImageUrlBuilder from '@sanity/image-url';
import { createDataAttribute } from 'next-sanity';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }

  return imageBuilder?.image(source).auto('format').fit('max');
};

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) {
    return;
  }
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url();
  if (!url) {
    return;
  }
  return { url, alt: image?.alt as string, width, height };
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: Link | undefined) {
  if (!link) {
    return null;
  }

  // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
  if (!link.linkType && link.href) {
    link.linkType = 'href';
  }

  switch (link.linkType) {
    case 'href':
      return link.href || null;
    case 'page':
      if (link?.page && typeof link.page === 'string') {
        return `/${link.page}`;
      }
      break;
    case 'post':
      if (link?.post && typeof link.post === 'string') {
        return `/posts/${link.post}`;
      }
      break;
    default:
      return null;
  }

  return null;
}

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>;

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config);
}
