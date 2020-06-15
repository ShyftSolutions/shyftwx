declare type ProductSelectorProps = {
    categories: Category[];
    label?: string;
    action: (ProductSelectionResponse) => void;
};

declare type ProductMenuProps = {
  options: Category[];
  action: (product: object) => void;
}

declare type Category = {
    name: string;
    open: boolean;
    products: CategoryProduct[];
};

declare type CategoryProduct = {
    name: string;
    icon?: IconProp;
};

declare type ProductSelectionResponse = {
    level: string;
    product: string;
}
