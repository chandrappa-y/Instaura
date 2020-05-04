const { v4: uuidv4 } = require('uuid');
const products = require('./inventory').products;

const addProduct = ({ input }) => {
  let product = {};
  const productId = uuidv4();
  product = {
    productId: productId,
    imageId: 4,
    quantity: '1',
    name: input.name,
    brand: input.brand,
    type: input.type,
    concern: input.concern,
    price: input.price,
    maxQuantity: input.maxQuantity,
    ingredients: input.ingredients,
    howToUse: input.howToUse
  }
  products[productId] = { ...product };
  return products;
};

const getAllProducts = () => {
  return products;
};

const replaceProduct = ({ productId, product }) => {
  if (!products[productId]) {
    return;
  }
  products[productId] = { ...product };
  return products;
};

const removeProduct = ({ productId }) => {
  if (!products[productId]) {
    return;
  }
  delete products[productId];
  return products;
};

const reduceMaxQuantityOfProductByOne = ({ productId }) => {
  if (!products[productId]) {
    return;
  }
  products[productId].maxQuantity -= 1;
  return;
}

module.exports = {
  addProduct,
  getAllProducts,
  replaceProduct,
  removeProduct,
  reduceMaxQuantityOfProductByOne
};