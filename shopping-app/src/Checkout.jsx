import React, { useState, useEffect } from 'react';
import { sendOrder } from './services';
import OrderPlaced from './OrderPlaced';
import errors from './errors';
import images from './mapImages';

const Checkout = ({ username, cart }) => {

    let totalAmount = 0.0;
    const [total, setTotal] = useState(0);
    const [order, setOrder] = useState({ isPlaced: false });
    const [error, setError] = useState({ isSet: false });

    useEffect(() => {
        Object.keys(cart).map((key) => {
            totalAmount = parseFloat(totalAmount, 10) + (parseInt(cart[key].quantity, 10) * parseFloat(cart[key].price));
            let value = totalAmount.toFixed(2);
            setTotal(value);
        });
    }, []);

    const submitOrder = () => {
        let orderProducts = cart;
        sendOrder({ username, orderProducts })
            .then((response) => {
                setOrder({
                    isPlaced: true,
                    orderDetails: response.orderDetails,
                    orderId: response.orderId
                });
            })
            .catch((error) => setError({ isSet: true, message: errors([error.code || 'DEFAULT']) }));
    }

    return (
        <div className="checkout-page">
            <span className="errors">{error.message}</span>
            {order.isPlaced ? '' :
                error.isSet ? '' : <div className="submit-order">
                    <label className="product-label">Estimated Value :  </label>
                    <span className="text" value={total}>{total} </span>
                    <button onClick={submitOrder}>Submit Order</button>
                </div>}
            {order.isPlaced ? '' :
                error.isSet ? '' :
                    <div>
                        <ul className="product-list">
                            {
                                Object.keys(cart).map((key) =>
                                    <li className="product" id={key}>
                                        <img src={images[cart[key].imageId].src} alt="" height='100' width='100' />
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
                                        </div>
                                        <div>
                                            <label className="product-label">Quantity : </label>
                                            <span className="text">{cart[key].quantity}</span>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
            }
            {
                order.isPlaced ? <OrderPlaced username={username} order={order} /> : ''
            }
        </div>
    );
}

export default Checkout;