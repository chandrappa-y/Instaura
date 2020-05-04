export const performFilter = ({ products, value }) => {
    if (value === 'Skincare') {
        const filteredList = filterSkincareProducts({ products })
        return filteredList;
    }
    if (value === 'Hair') {
        const filteredList = filterHairProducts({ products })
        return filteredList;
    }
    if (value === 'MakeUp') {
        const filteredList = filterMakeUpProducts({ products })
        return filteredList;
    }
    return products;
}

const filterSkincareProducts = ({ products }) => {
    const filteredList = {};
    Object.values(products).filter(function (a) {
        if (a.type === 'skincare') return true;
        else return false;
    }).map((product) => {
        filteredList[product.productId] = product;
    });
    return filteredList;
}

const filterHairProducts = ({ products }) => {
    const filteredList = {};
    Object.values(products).filter(function (a) {
        if (a.type === 'hair')
            return true;
        else return false;
    }).map((product) => {
        filteredList[product.productId] = product;
    });
    return filteredList;
}

const filterMakeUpProducts = ({ products }) => {
    const filteredList = {};
    Object.values(products).filter(function (a) {
        if (a.type === 'makeup') return true;
        else return false;
    }).map((product) => {
        filteredList[product.productId] = product;
    });
    return filteredList;
}

export const performSort = ({ products, value }) => {
    if (value === 'Price High to Low') {
        const sortedList = sortByPriceHigh({ products });
        return sortedList;
    }
    if (value === 'Price Low to High') {
        const sortedList = sortByPriceLow({ products });
        return sortedList;
    }
    return products;
}

const sortByPriceHigh = ({ products }) => {
    const sortedList = {};
    Object.values(products).sort(function (a, b) {
        let aPrice = parseFloat(a.price);
        let bPrice = parseFloat(b.price);
        return bPrice - aPrice;
    }).map((product) => {
        sortedList[product.productId] = product;
    });
    return sortedList;
}

const sortByPriceLow = ({ products }) => {
    const sortedList = {};
    Object.values(products).sort(function (a, b) {
        let aPrice = parseFloat(a.price);
        let bPrice = parseFloat(b.price);
        return aPrice - bPrice;
    }).map((product) => {
        sortedList[product.productId] = product;
    });
    return sortedList;
}