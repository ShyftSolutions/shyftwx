/// <reference types="react" />
import { IconProp } from '@fortawesome/fontawesome-svg-core';
interface Category {
    name: string;
    open: boolean;
    products: Product[];
}
interface Product {
    name: string;
    icon: IconProp;
}
export declare const ProductSelector: (Props: {
    options: Category[];
    action: Function;
    label?: string;
}) => JSX.Element;
export default ProductSelector;
