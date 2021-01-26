import React from 'react';
/**
 * Uses Material UI to create a product menu with categories and subcategories
 *
 * @param options [
 {
        name: 'Menu',
        open: true,
        products: [
            {
                name: 'A'
            },
            {
                name: 'B'
            }
        ]
    }
 ]
 * @param action function that handles the selected product in the parent component
 * @param sortFn
 */
export declare const ProductMenu: React.FC<ProductMenuProps>;
export default ProductMenu;
