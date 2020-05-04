import React, { useState } from 'react'
import ThankYouPage from './ThankYouPage';
import images from './mapImages';

const OrderPlaced = ({ username, order }) => {

    const [viewThankYouPage, setThankYouPage] = useState(false);

    return (
        <div>
            {viewThankYouPage ? <ThankYouPage username={username} /> :
                <div>
                    <h2>Awesome! your order is placed</h2>
                    <div>
                        <label className="product-label">Your order Id is : </label>
                        <span className="text">{order.orderId}</span>
                    </div>
                    <ul className="order-products">
                        {
                            Object.keys(order.orderDetails).map((key) =>
                                key === "date" ? '' :
                                    <li id={key}>
                                        <div>
                                            <img src={images[order.orderDetails[key].imageId].src} height='100' width='100' alt="" />
                                        </div>
                                        <div className="product-details-info">
                                            <label className="product-label">Name : </label>
                                            <span className="text">{order.orderDetails[key].name}</span>
                                        </div>
                                        <div>
                                            <label className="product-label">Price : </label>
                                            <span className="text">{order.orderDetails[key].price}</span>
                                        </div>
                                    </li>
                            )
                        }
                    </ul>
                    <div>
                        <button onClick={() => setThankYouPage(true)}>Give Feedback!</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default OrderPlaced;