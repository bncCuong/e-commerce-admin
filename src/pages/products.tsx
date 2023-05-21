import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, Layout } from '@/components';
import { Button } from '@/utils';

type Props = {};

const Products = (props: Props) => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const fetchProducts = () => {
        axios.get('api/products').then((res) => {
            setProducts(res.data);
        });
    };
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <Layout>
            <Link href="/products/newproduct">
                <Button type="button">Add new product</Button>
            </Link>
            <div className="flex space-x-4 flex-wrap">
                <>
                    {products.length == 0 ? (
                        <h1>Have no product, let add some product!</h1>
                    ) : (
                        products.map((product) => {
                            return (
                                <Card
                                    fetchProduct={fetchProducts}
                                    images={product.images}
                                    key={product._id}
                                    name={product.name}
                                    _id={product._id}
                                    description={product.description}
                                    price={product.price}
                                />
                            );
                        })
                    )}
                </>
            </div>
        </Layout>
    );
};

export default Products;
