import React, { useEffect, useState } from 'react';
import { fetchWishList, removeProductFromWishList, postProductToCart } from './services';
import errors from './errors';
import images from './mapImages';

const UserWishList = ({ username, onCloseWishList }) => {

    const [wishList, setWishList] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchWishList({ username })
            .then((response) => {
                if (JSON.stringify(response) === '{}') {
                    setMessage(errors['wishlist_empty']);
                    return;
                }
                setMessage('');
                setWishList(response);
            })
            .catch((error) => setMessage(errors[error.code || 'DEFAULT']));
    }, []);

    console.log("WishList");
    console.log(wishList);

    const removeFromWishList = (productId) => {
        removeProductFromWishList({ username, productId })
            .then((response) => {
                if (JSON.stringify(response) === '{}') {
                    setMessage(errors['wishlist_empty']);
                }
                setWishList(response);
            })
            .catch((error) => setMessage(errors[error.code || 'DEFAULT']))
    }

    const addToCart = (product) => {
        postProductToCart({ username, product })
            .then(() => removeFromWishList(product.productId))
            .catch((error) => setMessage(errors[error.code || 'DEFAULT']));
    }

    return (
        <div className="page">
            <span className="errors" value={message}>{message}</span>
            <ul className="product-list">
                {
                    Object.keys(wishList).map((key) =>
                        <li className="product" id={key}>
                            <div>
                                <img src={images[wishList[key].imageId].src} alt="" height='100' width='100' />
                            </div>
                            <div>
                                <label className="product-label">Name : </label>
                                <span className="text">{wishList[key].name} </span>
                            </div>
                            <div>
                                <label className="product-label">Brand : </label>
                                <span className="text">{wishList[key].brand} </span>
                            </div>
                            <div>
                                <label className="product-label">Price : </label>
                                <span className="text">{wishList[key].price} </span>
                            </div>
                            <button id={key} onClick={() => removeFromWishList(wishList[key].productId)}>Remove</button>
                            {
                                wishList[key].maxQuantity == '0' ? '' :
                                    <button id={key} onClick={(e) => addToCart(wishList[key])}>Add to cart</button>
                            }
                        </li>
                    )
                }
            </ul>
            <button onClick={() => onCloseWishList()}>close</button>
        </div>
    )
}

export default UserWishList;