import CategoryPreview from "../components/home/CategoryPreview";
import LandingView from "../components/home/LandingView";
import { CategoryPreviewList } from "../types/categoryPreviewType";
import { GetStaticProps } from "next";

export default function Home({ categoryPreviewList }: CategoryPreviewList) {
    return (
        <div>
            <LandingView />
            <CategoryPreview categoryPreviewList={categoryPreviewList} />
        </div>
    )
}

export const getStaticProps: GetStaticProps<CategoryPreviewList> = async (context) => {

    const categoryPreviewList = [
        {
            name: 'Desk and Office',
            description: 'Work from home accessories',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
            imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
            href: '/tshirt',
        },
        {
            name: 'Self-Improvement',
            description: 'Journals and note-taking',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
            imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
            href: '/pants',
        },
        {
            name: 'Travel',
            description: 'Daily commute essentials',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
            imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
            href: '/bags',
        },
    ]

    /*
    // The target API endpoint you want to proxy
    const targetUrl = encodeURIComponent(`http://localhost:5001/products/`);

    // Get the absolute URL for the API route
    const protocol = 'http';
    const host = 'localhost:3000';
    const apiUrl = new URL(`/api/proxy?targetUrl=${targetUrl}`, `${protocol}://${host}`);

    const res: AxiosResponse = await axios.get(apiUrl.toString());
    const categoryPreviewList = res.data;
    */

    return {
        props: {
            categoryPreviewList,
        },
    };
};