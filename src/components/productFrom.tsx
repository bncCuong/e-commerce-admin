import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card, Layout } from '@/components';
import { Input, Button } from '@/utils';
import axios from 'axios';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import CricleLoader from 'react-spinners/CircleLoader';

type FormValue = {
    name?: string;
    description?: string;
    price?: number;
    _id?: string;
    images?: string[];
    existingImages?: string[];
    categorie?: string;
    parent?: string;
    product_properties?: Object;
};

export const ProductFrom = ({
    name: existingName,
    description: existingDescription,
    price: existingPrice,
    _id,
    existingImages,
    categorie: existingCategorie,
    product_properties: existingProduct_properties,
}: FormValue) => {
    const router = useRouter();
    const [backToProduct, setBackToProduct] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadPage, setUploadPage] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categorieOption, setCategorieOption] = useState<string>(existingCategorie || '');
    const [productProperties, setProductProperties] = useState<Object>({});
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValue>();

    //get list category
    useEffect(() => {
        axios.get('/api/categories').then((result) => setCategories(result.data));
    }, []);

    const addProductSubmitHanler: SubmitHandler<FormValue> = async (data) => {
        if (images.length > 0) {
            data['images'] = images;
        }
        if (categorieOption) {
            data['categorie'] = categorieOption;
        }
        if (productProperties) {
            data['product_properties'] = productProperties;
        }
        if (_id) {
            //update product\
            if (data['name'] == '') {
                data['name'] = existingName;
            }
            if (data['price'] == 0) {
                data['price'] = existingPrice;
            }
            if (data['description'] == '') data['description'] = existingDescription;
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
        setLoading(true);
        setUploadPage(true);
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
        setLoading(false);
    };

    const productPropertiesFill = [];
    if (categorieOption && categories.length > 0) {
        const propertiesInfo = categories.find((item) => item._id === categorieOption);
        productPropertiesFill.push(...(propertiesInfo?.properties as Object[]));
    }

    const changePropertiesHanler = (key: string, value: string) => {
        setProductProperties((prev) => {
            const prodProList = { ...prev };
            prodProList[key] = value;
            return prodProList;
        });
    };

    

    const cancelBtnHanler = () => {
        router.push('/products');
    };
    return (
        <Layout>
            <h1 className="font-bold text-4xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 bg-clip-text text-transparent mb-10 ">
                {_id ? 'Edit product' : 'Add new product'}
            </h1>
            <form onSubmit={handleSubmit(addProductSubmitHanler)} className="ml-10">
                {_id && (
                    <Card
                        images={existingImages}
                        _id={_id}
                        existingName={existingName}
                        existingPrice={existingPrice}
                        existingDescription={existingDescription}
                    />
                )}
                {!!images.length && <Card images={images} _id={_id} upLoadPage={uploadPage} />}
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
                <div className="flex flex-col space-y-2 w-[300px] mb-4">
                    <div className="flex space-x-2">
                        <label>Category:</label>
                        <select
                            className="flex-1"
                            value={categorieOption}
                            onChange={(ev) => setCategorieOption(ev.target.value)}
                        >
                            {categories.length > 0 &&
                                categories.map((item) => (
                                    <option className="w-[300px] py-1" key={item._id} value={item._id}>
                                        {item.categorie}
                                    </option>
                                ))}
                        </select>
                    </div>
                    {productPropertiesFill.map((item: any, index: number) => (
                        <div className="flex ml-20" key={index}>
                            <p>{item.key} :</p>
                            <select
                                value={productProperties[item.key]}
                                className="flex-1"
                                onChange={(ev) => changePropertiesHanler(item.key, ev.target.value)}
                            >
                                {item.values.map((value: string) => (
                                    <option className="text-center" key={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

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

                <div className="">
                    <p>Upload photos</p>
                    <label className="inline-block">
                        <input type="file" className="hidden" onChange={onUpLoadImage} />
                        <p className="w-24 h-24 bg-slate-400/70 rounded-md flex items-center justify-center text-sm font-medium cursor-pointer gap-1 mb-4">
                            {loading ? (
                                <CricleLoader size={40} loading={loading} color={'#2463eb'} />
                            ) : (
                                <span className="flex">
                                    <ArrowUpOnSquareIcon width={16} /> Upload
                                </span>
                            )}
                        </p>
                    </label>
                </div>

                <Button type="submit" children={_id ? 'Edit product' : 'Add new product'} />
                <Button type="button" children="Cancel" onClick={cancelBtnHanler} />
            </form>
        </Layout>
    );
};
