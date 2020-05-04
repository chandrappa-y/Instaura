import React, { useState } from 'react'
import { performSort } from './sortAndFilter';

const Sort = ({ products, onSort, notifyClearSort }) => {
    const [displayOptions, setDisplayOptions] = useState(false);

    const callSort = (value) => {
        setDisplayOptions(false);
        const list = performSort({ products, value });
        onSort({ list, value });

    }

    const clearSort = () => {
        notifyClearSort();
        setDisplayOptions(false);
    }

    return (
        <div>
            <div>
                <button onClick={() => setDisplayOptions(true)}>Sort </button>
                {
                    displayOptions ? <div className="sort-options">
                        <span className="option" onClick={() => clearSort()}>None</span>
                        <span className="option" onClick={() => callSort('Price High to Low')}>Price High to Low</span>
                        <span className="option" onClick={() => callSort('Price Low to High')}>Price Low to High</span>
                    </div> : ''
                }
            </div>
        </div>
    )
}

export default Sort;