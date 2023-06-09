import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import mime from 'mime-types';

//file system library
import fs from 'fs';
import { mongooseConnect } from '../../../lib/mongoose';

const bucketName = 'bnc-ecommerce-web';

export default async function uploadImage(req, res) {
    await mongooseConnect();
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });

    const client = new S3Client({
        region: 'ap-southeast-1',
        credentials: {
            accessKeyId: process.env.S3_ACCSES_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });



    const links = [];
    for (const file of files.file) {
        //cắt lấy phần đuôi sau dấu chấm của tên ảnh
        const ext = file.originalFilename.split('.').pop();

        //đặt lại tên cho file ảnh
        const newFileName = Date.now() + '.' + ext;
        await client.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: newFileName,
                Body: fs.readFileSync(file.path),
                ACL: 'public-read',
                ContentType: mime.lookup(file.path),
            }),
        );


        const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
        links.push(link);
    }
    return res.json({ links });
}

export const config = {
    api: { bodyParser: false },
};
