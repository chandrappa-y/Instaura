import React, { useEffect, useState } from 'react';
import { fetchCart, updateProductQty, removeProductFromCart } from './services';
import Checkout from './Checkout';
import errors from './errors';
import images from './mapImages';

const Cart = ({ username, closeCart }) => {
    let newQty = 0;
    const [cart, setCart] = useState({});
    const [checkout, setCheckout] = useState({ displayCheckout: false });
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const [error, setError] = useState({ isSet: false });

    useEffect(() => {
        fetchCart(username)
            .then((response) => {
                if (JSON.stringify(response) === '{}') {
                    setIsCartEmpty(true);
                }
                else {
                    setCart(response)
                    setError({ isSet: false, message: '' });
                };
            })
            .catch((error) => setError({ isSet: true, message: errors[error.code || 'DEFAULT'] }));
    }, []);

    const close = () => {
        setCheckout({ displayCheckout: false });
        closeCart();
    }

    const update = (product) => {
        const productId = product.productId;
        product.quantity = newQty;
        if (newQty > parseInt(product.maxQuantity)) {
            setError({
                isSet: true,
                message: `Sorry we have only ${product.maxQuantity} ${product.name} left`
            })
        }
        else {
            updateProductQty({ username, productId, product })
                .then((response) => {
                    setError({
                        isSet: false,
                        message: ''
                    });
                    setCart(response);
                })
                .catch((error) => setError({ isSet: true, message: errors[error.code || 'DEFAULT'] }));
        }
    }

    const performDelete = (productId) => {
        removeProductFromCart({ username, productId })
            .then((response) => {
                if (JSON.stringify(response) === '{}') {
                    setIsCartEmpty(true);
                    return;
                }
                setCart(response);
            })
            .catch((error) => setError({ isSet: true, message: errors[error.code || 'DEFAULT'] }));
    }

    return (
        <div >
            <span className="errors">{error.message}</span>
            <div className="close-button">
                <button onClick={close}>Back</button>
            </div>
            {isCartEmpty ? <span className="text">Your cart is Empty! </span> :
                <div>
                    {(error.isSet) ? '' :
                        !checkout.displayCheckout ?
                            <div className="checkout-button">
                                <button onClick={() => { setCheckout({ displayCheckout: true }) }}>Checkout</button>
                            </div>
                            : ''
                    }
                    <ul className="product-list">
                        {!checkout.displayCheckout ?
                            Object.keys(cart).map((key) =>
                                <li className="product" id={key}>
                                    <img src={images[cart[key].imageId].src} alt="" height='100' width='100' />
                                    <div className="product-text">
                                        <div>
                                            <label className="product-label">Name : </label>
                                            <span className="text">{cart[key].name}</span>
                                        </div>
                                        <div>
                                            <label className="product-label">Brand : </label>
                                            <span className="text">{cart[key].brand}</span>
                                        </div>
                                        <div>
                                            <label className="product-label">Price : </label>
                                            <span className="text">{cart[key].price}</span>
                                            <select name="" id="" value={cart[key].quantity} onChange={(e) => {
                                                newQty = e.target.value;
                                                update(cart[key])
                                            }}>
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                                                    quantity => <option>{quantity}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button id={key} onClick={(e) => performDelete(cart[key].productId)}>Delete</button>
                                    </div>
                                </li>)
                            : ''
                        }
                    </ul>
                    {
                        (checkout.displayCheckout) ? <Checkout username={username} cart={cart} /> : ''
                    }
                </div>
            }
        </div>
    )
}

export default Cart;