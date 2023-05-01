export type CategoryPreviewItem = {
    name: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    href: string;
}

export type CategoryPreviewList = {
    categoryPreviewList: CategoryPreviewItem[];
}