declare type ProductSelectorProps = {
    categories: Category[];
    label?: string;
    action: (category: Category) => void;
};

declare type Category = {
    name: string;
    open: boolean;
    products: Product[];
};

declare type Product = {
    name: string;
    icon: IconProp;
};
