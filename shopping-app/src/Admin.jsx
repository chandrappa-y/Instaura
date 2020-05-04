import React, { useEffect, useState } from 'react'
import { fetchProducts, updateProduct, deleteProduct } from './services';
import AddNewProduct from './AddNewProduct';
import errors from './errors'
import images from './mapImages';

const Admin = () => {

    const [products, setProducts] = useState({});
    const [editPrice, setEditPrice] = useState({ edit: false });
    const [editMaxQty, setMaxQty] = useState({ edit: false });
    const [display, setDisplay] = useState({ addProductPage: false });
    const [error, setError] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newMaxQty, setNewMaxQty] = useState('');

    const closeEditPrice = () => {
        setEditPrice({ edit: false });
    }

    const closeEditMaxQty = () => {
        setMaxQty({ edit: false });
    }

    useEffect(() => {
        fetchProducts()
            .then((response) => {
                setProducts(response);
                setError('');
            })
            .catch((error) => setError(errors[error.code || 'DEFAULT']));
    }, []);

    const update = () => {
        let product = {};
        let productId = '';
        if (editPrice.edit) {
            if (!newPrice || isNaN(newPrice)) {
                setError(errors['invalid_price']);
                setNewPrice('');
                return;
            }
            product = editPrice.product;
            productId = product.productId;
            product.price = newPrice;
        } else if (editMaxQty.edit) {
            if (!newMaxQty || isNaN(newMaxQty)) {
                setError(errors['invalid_maxQuantity']);
                setNewMaxQty('');
                return;
            }
            product = editMaxQty.product;
            productId = product.productId;
            product.maxQuantity = newMaxQty;
        }
        updateProduct({ productId, product })
            .then((response) => {
                setEditPrice({ edit: false });
                setMaxQty({ edit: false });
                setProducts(response);
                setError('');
            })
            .catch((error) => setError(errors[error.code || 'DEFAULT']));
    }

    const removeProduct = (productId) => {
        deleteProduct({ productId })
            .then((response) => {
                setProducts(response);
                setError('');
            })
            .catch((error) => setError(errors[error.code || 'DEFAULT']));
    }

    const close = (response) => {
        setDisplay({ addProductPage: false });
        setProducts(response);
        setError('');
    }

    const closeForm = () => {
        setDisplay({ addProductPage: false });
        setError('');
    }

    return (
        <div >
            <span className="errors">{error}</span>
            <div>
                <button onClick={() => setDisplay({ addProductPage: true })}>Add Product</button>
                {
                    display.addProductPage ? <AddNewProduct close={close} closeForm={closeForm} /> : ''
                }
            </div>
            <div className="admin-page">
                <ul className="product-list">
                    {display.addProductPage ? '' :
                        Object.keys(products).map((key) =>
                            <li className="admin-product">
                                <div>
                                    <img src={images[products[key].imageId].src} alt="Image" width="150" height="150" />
                                </div>
                                <div>
                                    <span>Name : {products[key].name}</span>
                                </div>
                                <div>
                                    <span>Brand : {products[key].brand}</span>
                                </div>
                                <div>
                                    <span>Price : ${products[key].price}</span>
                                </div>
                                <div>
                                    <span>Skincare concern : {products[key].concern}</span>
                                </div>
                                <div>
                                    <span>Max Quantity : {products[key].maxQuantity}</span>
                                </div>
                                <div>
                                    <button id={key} onClick={() => setMaxQty({
                                        edit: true,
                                        productId: key,
                                        product: products[key]
                                    })}>Update max Quantity</button>

                                    <button id={key} onClick={() => setEditPrice({
                                        edit: true,
                                        productId: key,
                                        product: products[key]
                                    })}>Update Price</button>
                                </div>
                                <div>
                                    {(editPrice.edit && key === editPrice.productId) ?
                                        <div>
                                            <input type="text" placeholder="Enter Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                                            <button onClick={() => closeEditPrice()}>x</button>
                                        </div> : ''
                                    }
                                </div>
                                <div>
                                    {(editMaxQty.edit && key === editMaxQty.productId) ?
                                        <div>
                                            <input type="text" placeholder="Enter Quantity" value={newMaxQty} onChange={(e) => setNewMaxQty(e.target.value)} />
                                            <button onClick={() => closeEditMaxQty()}>x</button>
                                        </div> : ''
                                    }
                                </div>
                                <div>
                                    {((editPrice.edit && key === editPrice.productId) || (editMaxQty.edit && key === editMaxQty.productId)) ?
                                        <button onClick={() => update()}>Submit</button> : ''
                                    }
                                </div>
                                <div>
                                    <button id={key} onClick={(e) => removeProduct(e.target.id)}>Remove Product</button>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Admin;