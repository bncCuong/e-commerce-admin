import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, Layout } from '@/components';
import { Button } from '@/utils';
import CricleLoader from 'react-spinners/CircleLoader';

type Props = {};

const Products = (props: Props) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        axios.get('api/products').then((res) => {
            setProducts(res.data);
        });

        setLoading(false);
    }, []);

    return (
        <Layout>
            <Link href="/products/newproduct">
                <Button type="button">Add new product</Button>
            </Link>
            <div className="flex space-x-4 flex-wrap">
                {loading ? (
                    <CricleLoader size={40} loading={loading} color={'#2463eb'} />
                ) : (
                    <>
                        {products.map((product) => {
                            return (
                                <Card
                                    images={product.images}
                                    key={product._id}
                                    name={product.name}
                                    _id={product._id}
                                    description={product.description}
                                    price={product.price}
                                />
                            );
                        })}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Products;
