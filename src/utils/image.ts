import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';

export const compressImage = async (image: File) => {
  try {
    const compressed = await imageCompression(image, {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
      fileType: 'image/webp',
    });

    return new File([compressed], `${uuidv4()}.webp`, { type: 'image/webp' });
  } catch (error) {
    console.log('사진 압축 실패', error);
    return new File([image], `${uuidv4()}.webp`, { type: 'image/webp' });
  }
};
