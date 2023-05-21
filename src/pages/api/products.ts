// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../models/Product';
import { mongooseConnect } from '../../../lib/mongoose';

export default async function createProduct(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    await mongooseConnect();
    if (method === 'POST') {
        const { name, price, description, images, categorie } = req.body;
        const productDoc = await Product.create({
            name,
            price,
            description,
            images,
            categorie,
        });
        res.json(productDoc);
    }
    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Product.findOne({ _id: req.query.id }));
        } else {
            res.json(await Product.find());
        }
    }

    if (method === 'PUT') {
        const { name, price, description, _id, images, categorie } = req.body;
        await Product.updateOne({ _id }, { name, price, description, images, categorie });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query.id) {
            await Product.deleteOne({ _id: req.query.id });
            res.json(true);
        }
    }
}
