import React from 'react';
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
export declare const ProductMenu: React.FC<ProductMenuProps>;
export default ProductMenu;
