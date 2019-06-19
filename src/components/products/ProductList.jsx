import React from 'react';
import PropTypes from 'prop-types';
import ProductRow from './ProductRow';
import FlipMove from 'react-flip-move';

const ProductList = ({ products, onVote }) => {
    if(!products || !products.length) {
        return(
            <p className="text-center text-muted mt-5 lead">
                <i class="far fa-frown"></i> No products found
            </p>
        );
    }
    return (
        
        <FlipMove className="mt-4">
            {
                products.map((product) =>
                    <ProductRow product={product} key={product.id} onVote={(inc) => onVote(product.id, inc)} />)
            }
        </FlipMove>
    );
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    onVote: PropTypes.func
}

export default ProductList;