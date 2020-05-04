const { v4: uuidv4 } = require('uuid');
const basket = require('./basket');
const products = require('./products');
const wishList = require('./wish-list');

const orders = {};

const addOrder = ({ username, productsOrdered }) => {
  orders[username] = orders[username] || {};
  const orderId = uuidv4();
  let date = new Date().toDateString();

  for (product of Object.values(productsOrdered)) {
    product.maxQuantity -= 1;
    let productId = product.productId;
    products.reduceMaxQuantityOfProductByOne({ productId });
    wishList.reduceMaxQuantityOfProductByOne({ username, productId });
  }

  productsOrdered["date"] = date;
  orders[username][orderId] = { ...productsOrdered };
  const orderDetails = orders[username][orderId];

  basket.removeAllProductFromBasket({ username });
  return { orderDetails, orderId };
};

const getAllOrders = ({ username }) => {
  if (!orders[username]) {
    return {};
  }
  return orders[username];
};

const removeOrder = ({ username, orderId }) => {
  if (!orders[username]) {
    return;
  }
  delete orders[username][orderId];
  return orders[username];
};

module.exports = {
  addOrder,
  getAllOrders,
  removeOrder
};