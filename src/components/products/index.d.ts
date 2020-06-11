declare type ProductSelectorProps = {
    categories: Category[];
    label?: string;
    action: () => ProductSelectionResponse;
};

declare type ProductMenuProps = {
  options: Category[];
  action: (product: object) => void;
}

declare type Category = {
    name: string;
    open: boolean;
    products: Product[];
};

declare type Product = {
    name: string;
    icon?: IconProp;
};

declare type ProductSelectionResponse = {
    level: string;
    product: string;
}
