import React from 'react';
import images from './mapImages';

const DisplayProducts = ({ addToCart, addToWishList, products, onDetails }) => {
    return (
        <div>
            <ul className="product-list">
                {
                    Object.keys(products).map((key) =>
                        <li className="product" id={key}>
                            <div className="product-info">
                                <img src={images[products[key].imageId].src} alt="Image" height='150' width='150' />
                                <div className="product-text">
                                    <div>
                                        <label className="product-label">Name : </label>
                                        <span>{products[key].name}</span>
                                    </div>
                                    <div>
                                        <label className="product-label">Brand : </label>
                                        <span>{products[key].brand}</span>
                                    </div>
                                    <div>
                                        <label className="product-label">Price : </label>
                                        <span>${products[key].price}</span>
                                    </div>
                                    <div>
                                        {
                                            (products[key].maxQuantity == '0' || isNaN(products[key].maxQuantity)) ? <span className="out-of-stock-message">"Out of Stock"</span> : ''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button id={key} onClick={(e) => onDetails(e.target.id)}
                                >Details</button>
                                {
                                    products[key].maxQuantity == '0' ? '' :
                                        <button id={key} onClick={(e) => addToCart(products[key])}>Add to cart</button>
                                }
                                <button id={key} onClick={(e) => addToWishList(products[key])}>Add to WishList</button>
                            </div>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}

export default DisplayProducts;