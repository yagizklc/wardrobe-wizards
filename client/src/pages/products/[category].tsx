import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Product } from "../../types/productType";
import axios, { AxiosResponse } from 'axios';

type Props = {
    products: Product[];
};

export default function ProductsPage({ products }: Props) {
    return (
        <>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req } = context;
    const category = context.params?.category ?? '';

    // The target API endpoint you want to proxy
    const targetUrl = encodeURIComponent(`http://localhost:5001/products/${category}`);

    // Get the absolute URL for the API route
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers['host'];
    const apiUrl = new URL(`/api/proxy?targetUrl=${targetUrl}`, `${protocol}://${host}`);

    // Fetch data from the custom API route
    const res: AxiosResponse = await axios.get(apiUrl.toString());
    const products = res.data;

    return {
        props: {
            products,
        },
    };
};
