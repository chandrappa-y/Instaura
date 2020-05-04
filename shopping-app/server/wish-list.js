const wishList = {};

const addToWishList = ({ username, product }) => {
  wishList[username] = wishList[username] || {};
  const productId = product.productId;
  wishList[username][productId] = { ...product };
  return wishList[username];
};

const getProductsFromWishList = ({ username }) => {
  if (!wishList[username]) {
    return {};
  }
  return wishList[username];
};

const removeProductFromWishList = ({ username, productId }) => {
  if (!wishList[username]) {
    return;
  }
  delete wishList[username][productId];
  return wishList[username];
};

const reduceMaxQuantityOfProductByOne = ({ username,productId }) => {
  if (!wishList[username][productId]) {
    return;
  }
  wishList[username][productId].maxQuantity -= 1;
  return;
}

module.exports = {
  addToWishList,
  getProductsFromWishList,
  removeProductFromWishList,
  reduceMaxQuantityOfProductByOne
};