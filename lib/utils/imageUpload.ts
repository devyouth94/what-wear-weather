import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

//AWS
import AWS from 'aws-sdk';
import multer from 'multer';
import s3Storage from 'multer-sharp-s3';

const s3 = new AWS.S3({
  accessKeyId: String(process.env.ACCESS_KEY_ID),
  secretAccessKey: String(process.env.SECRET_ACCESS_KEY),
  region: 'ap-northeast-2',
});

export const imageUpload = (path: 'original' | 'profile') => {
  return multer({
    storage: s3Storage({
      s3,
      Bucket: String(process.env.BUCKET_NAME),
      Key: async (req: any, file: any, callback: any) => {
        const session: any = await getSession({ req });
        const userId = session.user.userId;
        callback(null, `${path}/${userId}/${uuidv4()}`);
      },
      resize: {
        width: 1000,
      },
      rotate: false,
      flip: false,
      flop: false,
    }),
  });
};

export const imageDelete = (Key: string) => {
  return s3.deleteObject(
    {
      Bucket: String(process.env.BUCKET_NAME),
      Key,
    },
    (error, data) => {
      console.log(data);
    },
  );
};
