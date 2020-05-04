import React, { useState } from 'react'
import UserOrder from './UserOrders';
import UserWishList from './UserWishList';

const UserAccount = ({ username, closeUserAccount }) => {
    const [order, setOrder] = useState({ display: false });
    const [display, setDisplay] = useState({ displayWishList: false });

    const close = () => {
        setOrder({
            display: false
        })
    }
    const closeWishList = () => {
        setDisplay({
            displayWishList: false
        })
    }

    return (
        <div className="page">
            <div>
                <button onClick={() => { setOrder({ display: true }); setDisplay({ displayWishList: false }) }}>My orders</button>
                {
                    order.display ? <UserOrder username={username} onClose={close} /> : ''
                }
            </div>
            <div>
                <button onClick={() => { setDisplay({ displayWishList: true }); setOrder({ display: false }); }}>My WishList</button>
                {
                    display.displayWishList ? <UserWishList username={username} onCloseWishList={closeWishList} /> : ''
                }
            </div>
            <div className="account-close-button">
                {(order.display || display.displayWishList) ? '' : <button onClick={() => closeUserAccount()}>Back</button>}
            </div>
        </div>
    )
}

export default UserAccount;