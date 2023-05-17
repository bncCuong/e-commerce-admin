import type { NextApiRequest, NextApiResponse } from 'next';

import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import mime from 'mime-types';

//file system library
import fs from 'fs';

const bucketName = 'bnc.e-commerce';

export default async function uploadImage(req: NextApiRequest, res: NextApiResponse) {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });

    const client = new S3Client({
        region: 'ap-southeast-2',
        credentials: {
            accessKeyId: process.env.S3_ACCSES_KEY as any,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as any,
        },
    });
    const links = [];
    for (const file of files.file) {
        //cắt lấy phần đuôi sau dấu chấm của tên ảnh
        const ext = file.originalFilename.split('.').pop();

        //đặt lại tên cho file ảnh
        const newFileName = Date.now() + '.' + ext;
        client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: newFileName,
                Body: fs.readFileSync(file.path),
                ACL: 'public-read',
                ContentType: mime.lookup(file.path) as any,
            }),
        );
        // const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
        const link = `https://s3.ap-southeast-2.amazonaws.com/${bucketName}/${newFileName}`;
        links.push(link);
    }
    return res.json({ links });
}

export const config = {
    api: { bodyParser: false },
};
