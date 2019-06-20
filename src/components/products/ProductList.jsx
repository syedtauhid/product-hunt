import React from "react";
import PropTypes from "prop-types";
import ProductRow from "./ProductRow";
import FlipMove from "react-flip-move";
import noProductLogo from "../../assets/noproduct.png";

const ProductList = ({ products, onVote }) => {
  if (!products || !products.length) {
    return <img src={noProductLogo} className="mx-auto d-block mt-5" />;
  }
  return (
    <FlipMove className="mt-4">
      {products.map(product => (
        <ProductRow
          product={product}
          key={product.id}
          onVote={inc => onVote(product.id, inc)}
        />
      ))}
    </FlipMove>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onVote: PropTypes.func
};

export default ProductList;
