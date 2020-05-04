const { sessions, addSession, deleteSession } = require('../session');
const products = require('../products');
const orders = require('../orders');
const basket = require('../basket');
const wishList = require('../wish-list');
const feedback = require('../feedback');

const routes = {
  session: {},
  products: {
    one: {},
    all: {},
  },
  orders: {
    one: {},
    all: {},
  },
  basket: {
    one: {},
    all: {},
  },
  wishList: {
    one: {},
    all: {},
  }, feedback: {

  }
};

routes.session.status = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  res.status(200).json(sessions[sId]);
};

routes.session.create = (req, res) => {
  const username = req.body.username;
  if (!username || !username.match(/^[A-Za-z\s]+$/) || username.toLowerCase() === 'dog' || !isNaN(username)) {
    res.status(403).json({ code: 'invalid_username' })
    return;
  }
  const session = addSession({ username });
  res.cookie('sId', session.id);
  res.status(200).json(sessions[session.id]);
};

routes.session.remove = (req, res) => {
  const sId = req.cookies.sId;
  res.clearCookie('sId');
  deleteSession(sId);
  res.sendStatus(200);
};

routes.products.all.read = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId || !sessions[sId]) {
    res.clearCookie('sId');
  }
  res.status(200).json(products.getAllProducts());
};

routes.products.one.add = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const input = req.body;
  res.status(200).json(products.addProduct({ input }));
};

routes.products.one.update = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const productId = req.params.productId;
  const product = req.body.product;
  const allProducts = products.replaceProduct({ productId, product });
  if (!allProducts) {
    res.status(400).json({ code: 'failed_to_update' });
    return;
  }
  res.status(200).json(allProducts);
};

routes.products.one.remove = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const productId = req.params.productId;
  const allProducts = products.removeProduct({ productId })
  if (!allProducts) {
    res.status(400).json({ code: 'no_such_productId' });
    return;
  }
  res.status(200).json(allProducts);
};

routes.basket.all.read = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const username = req.params.username;
  res.status(200).json(basket.getProductsFromBasket({ username }));
};

routes.basket.one.add = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const username = req.params.username;
  const product = req.body.product;
  if (!product) {
    res.status(400).json({ code: 'product_required' });
    return;
  }
  res.status(200).json(basket.addProductToBasket({ username, product }));
};

routes.basket.one.update = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const username = req.params.username;
  const productId = req.params.productId;
  const product = req.body.product;
  const productsInBasket = basket.replaceProductInBasket({ username, productId, product });
  if (!productsInBasket) {
    res.status(400).json({ code: 'failed_to_update' });
    return;
  }
  res.status(200).json(productsInBasket);
};

routes.basket.one.remove = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }

  const productId = req.params.productId;
  const username = req.params.username;
  const productsInBasket = basket.removeProductFromBasket({ username, productId })
  if (!productsInBasket) {
    res.status(400).json({ code: 'no_such_productId' });
    return;
  }
  res.status(200).json(productsInBasket);
};

routes.orders.all.read = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const username = req.params.username;
  if (!username) {
    res.status(400).json({ code: 'username_required' });
    return;
  }
  res.status(200).json(orders.getAllOrders({ username }));
};

routes.orders.one.add = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const username = req.params.username;
  const productsOrdered = req.body.productsOrdered;
  if (!productsOrdered) {
    res.status(400).json({ code: 'no_products_to_order' });
    return;
  }
  res.status(200).json(orders.addOrder({ username, productsOrdered }));
};

routes.orders.one.remove = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const orderId = req.params.orderId;
  const username = req.params.username;
  const allOrders = orders.removeOrder({ username, orderId });
  if (!allOrders) {
    res.status(400).json({ code: 'no_such_orderId' });
    return;
  }
  res.status(200).json(allOrders);
};

routes.wishList.all.read = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const username = req.params.username;
  if (!username) {
    res.status(400).json({ code: 'username_required' });
    return;
  }
  res.status(200).json(wishList.getProductsFromWishList({ username }));
};

routes.wishList.one.add = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const username = req.params.username;
  const product = req.body.product;
  if (!product) {
    res.status(400).json({ code: 'no_product_to_add' });
    return;
  }
  res.status(200).json(wishList.addToWishList({ username, product }));
};

routes.wishList.one.remove = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const productId = req.params.productId;
  const username = req.params.username;
  const allProductsInWishList = wishList.removeProductFromWishList({ username, productId });
  if (!allProductsInWishList) {
    res.status(400).json({ code: 'no_such_productId' });
    return;
  }
  res.status(200).json(allProductsInWishList);
};

routes.feedback.add = (req, res) => {
  const sId = req.cookies.sId;
  if (!sId) {
    res.status(401).json({ code: 'login_required' });
    return;
  }
  if (!sessions[sId]) {
    res.clearCookie('sId');
    res.status(403).json({ code: 'login_unauthorized' });
    return;
  }
  const username = req.params.username;
  const rating = req.body.rating;
  const comment = req.body.comment || 'No comment';

  feedback.addToFeedback({ username, rating, comment });
  res.sendStatus(200);
};

module.exports = routes;