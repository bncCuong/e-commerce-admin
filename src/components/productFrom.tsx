import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Layout } from '@/components';
import { Input, Button } from '@/utils';
import axios from 'axios';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

type FormValue = {
    name?: string;
    description?: string;
    price?: number;
    _id?: string;
    image?: string;
};

export const ProductFrom = ({
    name: existingName,
    description: existingDescription,
    price: existingPrice,
    _id,
    image: existingImage,
}: FormValue) => {
    const router = useRouter();
    const [backToProduct, setBackToProduct] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValue>();

    const addProductSubmitHanler: SubmitHandler<FormValue> = async (data) => {
        if (_id) {
            //update product
            await axios.put('/api/products', { ...data, _id });
        } else {
            //create pd
            await axios.post('/api/products', data);
            reset();
        }
        setBackToProduct(true);
    };
    if (backToProduct) {
        router.push('/products');
    }
    const onUpLoadImage = async (ev: any) => {
        const files = ev.target?.files;
        if (files.length > 0) {
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post('/api/upload', data);
            setImages((prevImage: string[]) => {
                return [...prevImage, ...res.data.links];
            });
        }
    };
    return (
        <Layout>
            <h1>{_id ? 'Edit product' : 'Add new product'}</h1>
            <form onSubmit={handleSubmit(addProductSubmitHanler)}>
                {!!images.length &&
                    images.map((image) => (
                        <div key={image} className="w-14 h-14 ">
                            <img src={image} alt="product image" width={50} height={60} />
                        </div>
                    ))}
                <Input
                    exitingValue={existingName}
                    require={existingName ? false : true}
                    isError={errors.name}
                    registee={register}
                    type="text"
                    placeholder="Product name"
                    label="Name product"
                    name="name"
                />
                <Input
                    exitingValue={existingPrice}
                    require={existingPrice ? false : true}
                    registee={register}
                    isError={errors.price}
                    type="number"
                    placeholder="Product price"
                    label="Price"
                    name="price"
                />
                <Input
                    exitingValue={existingDescription}
                    require={false}
                    isError={errors.description}
                    registee={register}
                    type="text"
                    placeholder="Description"
                    label="Description"
                    name="description"
                />
                {_id ? (
                    ''
                ) : (
                    <div className="">
                        <p>Upload photos</p>
                        <label className="inline-block">
                            <input type="file" className="hidden" onChange={onUpLoadImage} />
                            <p className="w-24 h-24 bg-slate-400/70 rounded-md flex items-center justify-center text-sm font-medium cursor-pointer gap-1 mb-4">
                                <span>
                                    <ArrowUpOnSquareIcon width={16} />
                                </span>
                                Upload
                            </p>
                        </label>
                    </div>
                )}

                <Button type="submit" children={_id ? 'Edit product' : 'Add new product'} />
            </form>
        </Layout>
    );
};
