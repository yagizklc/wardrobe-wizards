import { GetServerSideProps } from 'next';
import { Product } from "../../../types/productType";
import axios, { AxiosResponse } from 'axios';
import ProductView from '../../../components/product/ProductView';
import { useState, useEffect } from 'react';

type ProductProps = {
    product: Product;
};


export default function ProductPage({ product }: ProductProps) {

    return (
        <div>
            <ProductView product={product} />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ProductProps> = async (context) => {
    const { req } = context;
    const productId = context.params?.productId ?? '';

    // The target API endpoint you want to proxy
    const targetUrl = encodeURIComponent(`http://localhost:5001/products/id/${productId}`);

    // Get the absolute URL for the API route
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers['host'];
    const apiUrl = new URL(`/api/proxy?targetUrl=${targetUrl}`, `${protocol}://${host}`);


    // Fetch data from the custom API route
    const res: AxiosResponse = await axios.get(apiUrl.toString());
    const product = res.data;

    const imageCategory = product.category;
    const imageName = product.image;
    product.image = `http://localhost:5001/images/${imageCategory}/${imageName}`

    return {
        props: {
            product,
        },
    };
};
