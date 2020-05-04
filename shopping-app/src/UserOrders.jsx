import React, { useEffect, useState } from 'react'
import { fetchOrder, cancelOrder } from './services';
import errors from './errors';

const UserOrder = ({ username, onClose }) => {

    const [order, setOrder] = useState({});
    const [error, setError] = useState('');

    const performCancelOrder = (orderId) => {
        cancelOrder({ username, orderId })
            .then((response) => {
                setOrder(response);
                if (JSON.stringify(response) === '{}') {
                    setError(errors['order_empty']);
                }
            })
            .catch((error) => setError(errors[error.code || 'DEFAULT']));
    }

    useEffect(() => {
        fetchOrder({ username })
            .then((response) => {
                if (JSON.stringify(response) === '{}') {
                    setError(errors['order_empty']);
                    return;
                }
                setOrder(response);
            })
            .catch((error) => setError(errors[error.code || 'DEFAULT']));
    }, []);

    return (
        <div className="page">
            <span className="errors">{error}</span>
            <ul>
                {
                    Object.keys(order).map((key) =>
                        <ul>
                            <div className="order-id">
                                <span className="text">Order Id : {key}</span>
                            </div>
                            {
                                Object.keys(order[key]).map((id) =>
                                    id == "date" ? '' :
                                        <li id={id}>
                                            <div>
                                                <span className="text">Name : {order[key][id].name} </span>
                                                <span className="text">Brand : {order[key][id].brand} </span>
                                                <span className="text">Price : {order[key][id].price} </span>
                                            </div>
                                        </li>
                                )
                            }
                            <div>
                                <button id={key} onClick={(e) => performCancelOrder(e.target.id)}>Cancel Order</button>
                            </div>
                        </ul>
                    )
                }
            </ul>
            <button onClick={(e) => onClose()}>close</button>
        </div>
    )
}

export default UserOrder;
