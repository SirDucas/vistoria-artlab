import { z } from 'zod';

export const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  priceCents: z.coerce.number().int().min(100),
  type: z.enum(['QUADRO', 'OGGETTISTICA']),
  category: z.string().min(2),
  tags: z.string(),
  materials: z.string(),
  availability: z.enum(['IN_STOCK', 'MADE_TO_ORDER', 'SOLD_OUT']),
  quantity: z.coerce.number().int().min(0),
  sku: z.string().min(3),
  weightGrams: z.coerce.number().int().min(0).optional(),
  widthCm: z.coerce.number().optional(),
  heightCm: z.coerce.number().optional(),
  depthCm: z.coerce.number().optional(),
  isUniquePiece: z.coerce.boolean(),
  images: z.array(z.string().url()).min(1)
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});
