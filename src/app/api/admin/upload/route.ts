import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@/lib/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.isAdmin) return Response.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await req.formData();
  const file = data.get('file') as File | null;
  if (!file) return Response.json({ error: 'File missing' }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: 'vistoria-artlab' }, (error, uploaded) => {
      if (error || !uploaded) return reject(error);
      resolve(uploaded as { secure_url: string });
    }).end(buffer);
  });

  return Response.json({ url: result.secure_url });
}
