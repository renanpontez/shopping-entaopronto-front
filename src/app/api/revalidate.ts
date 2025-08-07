import { Env } from '@/libs/Env';
import { logger } from '@/libs/Logger';
import { parseBody } from 'next-sanity/webhook';
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Skip revalidation for asset types
const SKIP_TYPES = ['sanity.imageAsset', 'sanity.fileAsset', 'sanity.imagePalette'];

export async function POST(req: NextRequest) {
  logger.info('Received revalidation request', { method: req.method });

  // Track revalidated routes for logging
  const revalidatedRoutes: string[] = [];

  try {
    const { body, isValidSignature } = await parseBody(
      req,
      Env.SANITY_REVALIDATE_SECRET,
    );

    logger.info('Parsed webhook body', { type: body?._type, id: body?._id });

    if (!isValidSignature) {
      logger.error('Invalid signature');
      return new NextResponse('Invalid signature', { status: 401 });
    }

    if (!body?._type) {
      logger.error('Bad Request - Missing _type');
      return new NextResponse('Bad Request - Missing _type', { status: 400 });
    }

    // Skip asset types
    if (SKIP_TYPES.includes(body._type)) {
      logger.info('Skipping revalidation for asset', { type: body._type });
      return NextResponse.json({ message: 'Skipped revalidation for asset' });
    }

    logger.info('Processing revalidation', { type: body._type, id: body._id });

    // Helper function to revalidate a path and track it
    const revalidate = (path: string) => {
      try {
        logger.info('Revalidating path', { path });
        revalidatePath(path);
        revalidatedRoutes.push(path);
      } catch (error) {
        logger.error('Failed to revalidate path', { path, error });
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
        logger.warn('Unknown document type', { type: body._type });
        return new NextResponse(`Unknown document type: ${body._type}`, { status: 400 });
      }
    }

    logger.info('Successfully revalidated routes', { routes: revalidatedRoutes });

    return NextResponse.json({
      message,
      revalidated: revalidatedRoutes,
      type: body._type,
      documentId: body._id,
    });
  } catch (err) {
    logger.error('Revalidation error', { error: err });
    return new NextResponse(
      err instanceof Error ? err.message : 'Internal Server Error',
      { status: 500 },
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
