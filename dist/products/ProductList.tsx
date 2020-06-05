import React from 'react';

type Props = {
    products: ShyftProduct[];
};

const lookup: Record<string, number> = {};

export const ProductList: React.FC<Props> = ({ products }: Props) => {
    return (
       <div>{ products.map(product => (<p>{JSON.stringify(product)} </p>)) }</div>
    );
};

export default ProductList;