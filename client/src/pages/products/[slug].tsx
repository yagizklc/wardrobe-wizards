import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Product } from "../../types/productType";
import axios, { AxiosResponse } from 'axios';
import Link from 'next/link';
import ProductListView from '../../components/productList/ProductList';
type Props = {
    products: Product[];
};

export default function ProductsPage({ products }: Props) {
    return (
    <ProductListView>
  <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>PANTS</h2>
  <ul className="grid grid-cols-2 gap-4">
    {products.map((product) => (
      <li key={product._id}>
        <Link href={`/products/id/${product._id}`}>
          <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-50">
            <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
            <h3 className="text-gray-900 font-medium">{product.name}</h3>
          </div>
        </Link>
      </li>
    ))}
  </ul>
</ProductListView>

    
         
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const { req } = context;
    const categorySlug = context.params?.slug ?? '';

    // The target API endpoint you want to proxy, including the category slug
    const targetUrl = encodeURIComponent(`http://localhost:5001/categories/${categorySlug}`);
    console.log(targetUrl);
    // Get the absolute URL for the API route
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers['host'];
    const apiUrl = new URL(`/api/proxy?targetUrl=${targetUrl}`, `${protocol}://${host}`);

    // Fetch data from the custom API route
    const res: AxiosResponse = await axios.get(apiUrl.toString());
    const products = res.data;
    products.map((product: Product) => {
        const productCategory = product.category;
        const productName = product.image;
        product.image = `http://localhost:5001/images/${productCategory}/${productName}`
    })

    return {
        props: {
            products,
        },
    };
};
