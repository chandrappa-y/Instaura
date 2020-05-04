const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

app.get('/session', routes.session.status);
app.post('/session', routes.session.create);
app.delete('/session', routes.session.remove);

app.get('/products', routes.products.all.read);
app.post('/products',routes.products.one.add);
app.put('/products/:productId',routes.products.one.update);
app.delete('/products/:productId', routes.products.one.remove);

app.get('/basket/:username',routes.basket.all.read);
app.post('/basket/:username',routes.basket.one.add);
app.put('/basket/:username/:productId',routes.basket.one.update);
app.delete('/basket/:username/:productId',routes.basket.one.remove);

app.get('/orders/:username', routes.orders.all.read);
app.post('/orders/:username', routes.orders.one.add );
app.delete('/orders/:username/:orderId',routes.orders.one.remove);

app.post('/feedback/:username', routes.feedback.add);

app.post('/wishList/:username', routes.wishList.one.add);
app.get('/wishList/:username', routes.wishList.all.read);
app.delete('/wishList/:username/:productId',routes.wishList.one.remove );


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));