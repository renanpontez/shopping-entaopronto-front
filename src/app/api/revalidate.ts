import { Env } from '@/libs/Env';
import { parseBody } from 'next-sanity/webhook';
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// Skip revalidation for asset types
const SKIP_TYPES = ['sanity.imageAsset', 'sanity.fileAsset', 'sanity.imagePalette'];

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    console.error('❌ Method Not Allowed');
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  // Track revalidated routes for logging
  const revalidatedRoutes: string[] = [];

  try {
    const { body, isValidSignature } = await parseBody(
      req,
      Env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      console.error('❌ Invalid signature');
      return new NextResponse('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      console.error('❌ Bad Request - Missing _type');
      return new NextResponse('Bad Request - Missing _type', { status: 400 });
    }

    // Skip asset types
    if (SKIP_TYPES.includes(body._type)) {
      console.warn('Skipping revalidation for asset:', body._type);
      return NextResponse.json({ message: 'Skipped revalidation for asset' });
    }

    console.warn('Revalidation request received for:', body);

    // Helper function to revalidate a path and track it
    const revalidate = (path: string) => {
      try {
        console.warn('Revalidating:', path);
        revalidatePath(path);
        revalidatedRoutes.push(path);
      } catch (error) {
        console.error(`❌ Failed to revalidate ${path}:`, error);
      }
    };

    let message = '';

    switch (body._type) {
      case 'store': {
        revalidate('/');
        revalidate('/parceiros');
        if (body.slug?.current) {
          revalidate(`/parceiro/${body.slug.current}`);
        }
        message = `Revalidated store "${body.slug?.current}" and related pages`;
        break;
      }

      case 'category': {
        revalidate('/');
        revalidate('/categorias');
        if (body.slug?.current) {
          revalidate(`/categoria/${body.slug.current}`);
        }
        message = `Revalidated category "${body.slug?.current}" and related pages`;
        break;
      }

      case 'subcategory': {
        revalidate('/');
        revalidate('/categorias');
        message = 'Revalidated subcategory and related pages';
        break;
      }

      case 'siteSettings': {
        revalidate('/');
        revalidate('/parceiros');
        revalidate('/categorias');
        revalidate('/contato');
        message = 'Revalidated site settings and related pages';
        break;
      }

      default: {
        console.warn('Unknown document type:', body._type);
        return new NextResponse(`Unknown document type: ${body._type}`, { status: 400 });
      }
    }

    console.warn('Successfully revalidated routes:', revalidatedRoutes);

    return NextResponse.json({
      message,
      revalidated: revalidatedRoutes,
      type: body._type,
      documentId: body._id,
    });
  } catch (err) {
    console.error('❌ Revalidation error:', err);
    return new NextResponse(
      err instanceof Error ? err.message : 'Internal Server Error',
      { status: 500 },
    );
  }
}
