/// <reference types="react" />
import { IconProp } from '@fortawesome/fontawesome-svg-core';
interface Category {
    name: string;
    open: boolean;
    products: Product[];
}
interface Product {
    name: string;
    icon?: IconProp;
}
/**
 * Uses Material UI to create an accordian dropdown with main categories
 * and subcategories. 'defaultOptions' should be an array of objects in the
 * form of:
 *
 * {
            name: STRING,
            open: BOOLEAN,
            products: [{
                name: STRING,
                icon: FAICON,
            }, {
                name: STRING,
                icon: FAICON,
            }]
        },
 *
 * @param Props: {options: string[]}
 */
export declare const ProductMenu: (Props: {
    options: Category[];
    action: Function;
}) => JSX.Element;
export default ProductMenu;
