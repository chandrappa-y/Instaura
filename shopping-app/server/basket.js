const basket = {};

const addProductToBasket = ({username, product}) => {
  basket[username] = basket[username] || {};
  const productId = product.productId;
  basket[username][productId] = {...product};
  return basket[username];
};

const getProductsFromBasket = ({username}) => {
  if(!basket[username]) {
    return {};
  }
  return basket[username];
};

const replaceProductInBasket = ({ username, productId, product }) => {
  if(!basket[username] || !basket[username][productId]) {
    return;
  }
  basket[username][productId] = {...product};
  return basket[username];
};

const removeProductFromBasket = ({ username, productId }) => {
  if(!basket[username]) {
    return;
  }
  delete basket[username][productId];
  return basket[username];
};

const removeAllProductFromBasket = ({ username}) => {
    if(!basket[username]) {
      return;
    }
    delete basket[username];
    return;
  };

module.exports = {
    addProductToBasket,
    getProductsFromBasket,
    replaceProductInBasket,
    removeProductFromBasket,
    removeAllProductFromBasket
};