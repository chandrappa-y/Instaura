import React, { useState } from 'react';
import ProductsPage from './ProductsPage';
import Cart from './Cart';
import cartImage from './images/cartImage.png';

const ShoppingPage = ({ user, loginRequired, onLogout, displayError }) => {
    const [displayCart, setDisplayCart] = useState({ display: false });

    const close = () => {
        setDisplayCart(false);
    }
    const checkUserLoggedIn = () => {
        !user.username ? loginRequired() : setDisplayCart({ display: true })
    }
    const notifyLogin = () => {
        loginRequired();
    }

    const loggingOut = () => {
        onLogout();
    }

    const notifyError = (error) => {
        displayError(error);
    }

    return (
        <div>
            <div className="cart">
                <button className="cart-button" onClick={(e) => checkUserLoggedIn()}>
                    <img src={cartImage} alt="Cart" width='45px' height='45px' />
                    <span className="tip-text">Cart</span>
                </button>
            </div>
            <div>
                {displayCart.display ? <Cart username={user.username} closeCart={close} /> : ''}
            </div>
            <div>
                {!displayCart.display ? <ProductsPage user={user} username={user.username} login={notifyLogin} logoutCustomer={loggingOut} onError={notifyError} /> : ''}
            </div>
        </div>
    )
}

export default ShoppingPage;