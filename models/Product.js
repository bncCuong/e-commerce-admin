import { models, Schema, model } from 'mongoose';

const ProductSchema = new Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    description: String,
    images: [{ type: String }],
});

export const Product = models.Product || model('Product', ProductSchema);
