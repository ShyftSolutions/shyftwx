/**
 * Defines the types for the values used in the products file
 */

declare type ProductDrawerProps = {
    categories: Category[];
    label?: string;
    action: (ProductSelectionResponse) => void;
    window?: () => Window;
};

declare type ProductSelectorProps = {
    categories: Category[];
    label?: string;
    action: (ProductSelectionResponse) => void;
    // onSortToggle: () => void;
    // isSorted: boolean;
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
