/**
 * Defines the types for the values used in the products file
 */

declare type ProductDrawerProps = {
    categories: Category[];
    action: (ProductSelectionResponse) => void;
    window?: () => Window;
    options: string[];
};

declare type ProductMenuProps = {
    options: Category[];
    action: (product: object) => void;
    sortFn: any;
};

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
};
