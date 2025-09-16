import { z } from 'zod'

import data from '../data.json'

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const parsedSlug = await z.string().parse(slug);
  const product = data.products.find((product) => product.slug === parsedSlug);
  if (!product) {
    return Response.json({ message: 'Product not found.' }, { status: 400 });
  }
  return Response.json(product);
}