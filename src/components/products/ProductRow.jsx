import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ProductRow.css";

class ProductRow extends Component {
  render() {
    const { product, onVote } = this.props;
    return (
      <div className="card mb-3 product-item">
        <div className="card-body row">
          <div className="col-md-2">
            <img
              src={product.image.src}
              className="img-thumbnail"
              alt={product.title}
            />
          </div>
          <div className="col-md-7">
            <div className="text-primary lead">{product.title}</div>
            <div className="product-info">{product.info}</div>
            <div className="text-dark">
              <span className="text-muted small">Submitted by:</span>{" "}
              <i className="fas fa-user-circle" /> {product.submitted_by}
            </div>
          </div>
          <div className="col-md-3 text-right">
            <button className="btn btn-light" onClick={() => onVote(true)}>
              <i className="far fa-thumbs-up" /> like
            </button>
            <h1 className="text-info">
              <span className="small" /> {product.vote}
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

ProductRow.propTypes = {
  product: PropTypes.object.isRequired,
  onVote: PropTypes.func
};

export default ProductRow;
