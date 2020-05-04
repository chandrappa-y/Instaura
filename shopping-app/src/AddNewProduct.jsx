import React, { useState } from 'react'
import { postProduct } from './services';
import errors from './errors'

const AddNewProduct = ({ close, closeForm }) => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [concern, setConcern] = useState('');
    const [howToUse, setHowToUse] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [price, setPrice] = useState('');
    const [maxQuantity, setMaxQuantity] = useState('');
    const [error, setError] = useState('');

    const sendNewProduct = () => {
        if (!name || !brand || !type || !concern || !howToUse || !ingredients || !price || !maxQuantity) {
            setError(errors['invalid_input']);
            return;
        }
        let typeValue = type;
        if (typeValue.toLowerCase() !== 'makeup' && typeValue.toLowerCase() !== 'skincare' && typeValue.toLowerCase() !== 'hair') {
            setError(errors['invalid_type']);
            setType('');
            return;
        }
        if (isNaN(price)) {
            setError(errors['invalid_price']);
            setPrice('');
            return;
        }
        if (isNaN(maxQuantity)) {
            setError(errors['invalid_maxQuantity']);
            setMaxQuantity('');
            return;
        }
        postProduct({ name, brand, type, concern, howToUse, ingredients, price, maxQuantity })
            .then((response) => {
                close(response);
            })
            .catch((error) => setError(errors[error.code || 'DEFAULT']));

    }

    return (
        <div className="add-product-page">
            <span className="errors" value={error}>{error}</span>
            <div>
                <input type="text" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder="Enter Product Brand" onChange={(e) => setBrand(e.target.value)} />
            </div>
            <div>
                <input type="text" value={type} placeholder="Enter Product Type" onChange={(e) => setType(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder="Enter concern that product address" onChange={(e) => setConcern(e.target.value)} />
            </div>
            <div>
                <textarea className="new-product-details" type="text" placeholder="Enter how to use product" cols="65" rows="2" onChange={(e) => setHowToUse(e.target.value)}></textarea>
            </div>
            <div>
                <textarea className="new-product-details" type="text" placeholder="Enter product ingredients" cols="65" rows="2" onChange={(e) => setIngredients(e.target.value)}></textarea>
            </div>
            <div>
                <input type="text" placeholder="Enter price of the product" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <div>
                <input type="text" placeholder="Enter product quantity in stock" value={maxQuantity} onChange={(e) => setMaxQuantity(e.target.value)} />
            </div>
            <div>
                <button onClick={() => sendNewProduct()}>Submit</button>
            </div>
            <div>
                <button onClick={() => closeForm()}>Close</button>
            </div>
        </div>
    )
}

export default AddNewProduct;