import React, { useEffect, useState } from 'react';
import { fetchProducts, postProductToCart, addProductToWishList } from './services';
import ProductDetails from './ProductDetails';
import Filter from './Filter';
import Sort from './Sort';
import { performSort } from './sortAndFilter';
import Logout from './Logout';
import DisplayProducts from './DisplayProducts';

const ProductsPage = ({ user, username, login, logoutCustomer, onError }) => {

    const [products, setProductState] = useState({});
    const [filter, setFilter] = useState({});
    const [details, setDetails] = useState({});
    const [sort, setSortState] = useState({});
    const [list, setList] = useState({});
    const onDetails = (productKey) => {
        setDetails({
            displayDetails: true,
            productKey: productKey
        })
    }
    // let product = {};

    useEffect(() => {
        fetchProducts()
            .then((response) => {
                setProductState(
                    response
                );
            })
            .catch((error) => onError(error));
    }, []);

    const close = () => {
        setDetails({
            displayDetails: false,
            productKey: ''
        })
    }

    const addToCart = (product) => {
        if (!username) {
            login();
        }
        else {
            postProductToCart({ username, product })
                .then(() => { })
                .catch((error) => onError(error));
        }
    }

    const addToWishList = (product) => {
        if (!username) {
            login();
        }
        else {
            addProductToWishList({ username, product })
                .then(() => { })
                .catch((error) => onError(error));
        }
    }

    const filterState = ({ list }) => {
        setFilter({
            isFilterSet: true,
        })
        setList({
            products: list
        })
    }

    const clearFilter = () => {
        setFilter({
            isFilterSet: false,
        })
        if (sort.isSort) {
            let value = sort.value;
            let sortedList = performSort({ products, value });
            setList({
                products: sortedList
            })
        }
    }

    const clearSort = () => {
        setSortState({
            isSort: false,
            value: ''
        })
    }

    const sortState = ({ list, value }) => {
        setSortState({
            isSort: true,
            value: value
        })
        setList({
            products: list
        })
    }

    const notifyOnLogout = () => {
        logoutCustomer();
    }

    return (
        <div>
            {(details.displayDetails) ? '' :
                <div className="filter-sort">
                    <div className="filter">
                        <Filter products={products} onFilter={filterState} notifyClearFilter={clearFilter} />
                    </div>
                    <div className="sort">
                        <Sort products={filter.isFilterSet ? list.products : products} onSort={sortState} notifyClearSort={clearSort} />
                    </div>
                    <Logout user={user} logoutUser={notifyOnLogout} />
                </div>
            }
            <div>
                {
                    (details.displayDetails) ? '' : <DisplayProducts addToCart={addToCart} addToWishList={addToWishList} products={(filter.isFilterSet || sort.isSort) ? list.products : products} onDetails={onDetails} />
                }
                {
                    (details.displayDetails) ? <ProductDetails product={products[details.productKey]} closeDetails={close} /> : ''
                }
            </div>
        </div>
    )
}

export default ProductsPage;