import React, { useState } from 'react'
import { performFilter } from './sortAndFilter';

const Filter = ({ products, onFilter, notifyClearFilter }) => {
    const [displayOptions, setDisplayOptions] = useState(false);

    const callFilter = (value) => {
        setDisplayOptions(false);
        const list = performFilter({ products, value });
        onFilter({ list });
    }

    const clearFilter = () => {
        setDisplayOptions(false);
        notifyClearFilter();
    }

    return (
        <div>
            <div>
                <button className="filter-label" onClick={() => setDisplayOptions(true)}>Shop By Category! </button>
                {
                    displayOptions ? <div className="options">
                        <span className="option" onClick={(e) => clearFilter()}>All Products</span>
                        <span className="option" onClick={(e) => callFilter('Skincare')}>Skincare</span>
                        <span className="option" onClick={(e) => callFilter('Hair')}>Hair</span>
                        <span className="option" onClick={(e) => callFilter('MakeUp')}>MakeUp</span>
                    </div> : ''
                }
            </div>
        </div>
    )
}

export default Filter;