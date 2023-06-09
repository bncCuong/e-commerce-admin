import { Card, ProductFrom } from '@/components';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Props = {};

const EditPage = (props: Props) => {
    const [product, setProduct] = useState<ProductType>({} as ProductType);
    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/api/products?id=' + id).then((res) => {
            setProduct(res.data);
        });
    }, [id]);

    return (
        <>
            <ProductFrom
                categorie={product.categorie}
                existingImages={product.images}
                name={product.name}
                price={product.price}
                description={product.description}
                _id={id as string}
                product_properties={product.product_properties}
            />
        </>
    );
};

export default EditPage;
