// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '../../../models/Categories';
import axios from 'axios';
import { mongooseConnect } from '../../../lib/mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    await mongooseConnect();

    if (method === 'POST') {
        const { categorie, parent } = req.body;
        const categoryDoc = await Category.create({ categorie, parent: parent || undefined });
        res.json(categoryDoc);
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Category.findOne({ _id: req.query._id }));
        } else {
            res.json(await Category.find().populate('parent'));
        }
    }

    if (method === 'PUT') {
        const { categorie, parent, _id } = req.body;
        const categoryDoc = await Category.updateOne({ _id }, { categorie, parent: parent || undefined });
        res.json(categoryDoc);
    }

    if (method === 'DELETE') {
        if (req.query.id) {
            await Category.deleteOne({ _id: req.query.id });
            res.json('ok');
        }
    }
}
