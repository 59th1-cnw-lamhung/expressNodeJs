require('dotenv').config();

var express = require('express');// manager

var cookieParser = require('cookie-parser');

var csurf = require('csurf');

var mongoose = require('mongoose');

mongoose.connect('process.env.MONGO_URL');

var pug = require('pug');

var bodyParser = require('body-parser');

var app = express();// manager

var userRouter = require('./routes/user_router');

var authRouter = require('./routes/auth_router');

var productRouter = require('./routes/product_router');

var cartRouter = require('./routes/cart_router');

var transferRouter = require('./routes/transfer_router');


var authMiddleware = require('./middlewares/auth_middleware');

var sessionMiddleware = require('./middlewares/session_middleware');

var port = 3000;

app.set('view engine', 'pug');

app.set('views', './views');



app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser('process.env.SESSION_SECRET')); // Signed Cookie: tăng tính bảo mật, chống truy cập bất hợp pháp

app.use(sessionMiddleware);

app.use(csurf({cookie: true}));

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('view', {
        name: 'TAO',
    });
});


app.use('/users', authMiddleware.requireAuth, userRouter);

app.use('/products', productRouter);

app.use('/auth', authRouter);

app.use('/cart', cartRouter);

app.use('/transfer', authMiddleware.requireAuth, transferRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})