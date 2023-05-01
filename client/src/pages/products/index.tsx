/* eslint-disable react/jsx-key */
import { GetServerSideProps } from 'next';
import axios, { AxiosResponse } from 'axios';
import ProductListView from '../../components/productList/ProductList';
import ProductListItemView from '../../components/productList/ProductListItem';
import Pagination from '../../components/productList/Pagination';
import { Product } from '../../types/productType';

type ProductListProps = {
    productList: Product[]
}

export default function ProductsListPage({ productList }: ProductListProps) {
    return (
        <>

            <ProductListView>
                {/* create a for loop that takes each product from productList and renders a ProductListItemView */}
                {productList.map((product) => (
                    <ProductListItemView product={product} />
                ))}
                <Pagination />
            </ProductListView>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<ProductListProps> = async (context) => {
    const { req } = context;

    // The target API endpoint you want to proxy
    const targetUrl = encodeURIComponent('http://localhost:5001/products/');

    // Get the absolute URL for the API route
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers['host'];
    const apiUrl = new URL(`/api/proxy?targetUrl=${targetUrl}`, `${protocol}://${host}`);

    const res: AxiosResponse = await axios.get(apiUrl.toString());
    const productList = res.data;

    productList.map((product: Product) => {
        const productCategory = product.category;
        const productName = product.image;
        product.image = `http://localhost:5001/images/${productCategory}/${productName}`
    })

    return {
        props: {
            productList,
        },
    };
};