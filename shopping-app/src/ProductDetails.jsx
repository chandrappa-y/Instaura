import React from 'react';
import images from './mapImages';

const ProductDetails = ({ product, closeDetails }) => {

    return (
        <div className="product-details">
            <div>
                <img src={images[product.imageId].src} alt="Product Image" width="150" height="150" />
            </div>
            <div className="products-details-info">
                <div className="info" >
                    <label className="product-label">Name : </label>
                    <span>{product.name}</span>
                </div>
                <div className="info">
                    <label className="product-label">Brand : </label>
                    <span>{product.brand}</span>
                </div>
                <div className="info">
                    <label className="product-label">Price : </label>
                    <span>${product.price}</span>
                </div>
                <div className="info">
                    <label className="product-label">Skincare concern : </label>
                    <span>{product.concern}</span>
                </div>
                <div className="info">
                    <label className="product-label">How to use : </label>
                    <span>{product.howToUse}</span>
                </div>
                <div className="info">
                    <label className="product-label">Ingredients : </label>
                    <span>{product.ingredients}</span>
                </div>
            </div>
            <div >
                <button onClick={closeDetails}>Close</button>
            </div>
        </div>
    )
}

export default ProductDetails;