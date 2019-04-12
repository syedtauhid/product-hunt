import React from 'react';
import PropTypes from 'prop-types';
import ProductRow from './ProductRow';

const ProductList = ({ products, onVote }) => {
    if(!products || !products.length) {
        return(
            <p className="text-center text-muted mt-4 lead">
                <i class="far fa-frown"></i> No products found
            </p>
        );
    }
    return (
        
        <div className="mt-4">
            {
                products && products.map((product, key) =>
                    <ProductRow product={product} key={key} onVote={(count) => onVote(product.id, count)} />)
            }
        </div>
    );
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    onVote: PropTypes.func
}

export default ProductList;