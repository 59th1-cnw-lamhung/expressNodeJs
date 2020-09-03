require('dotenv').config();

var express = require('express');// manager

var cookieParser = require('cookie-parser');

var pug = require('pug');

var bodyParser = require('body-parser');

var app = express();// manager

var userRouter = require('./routes/user_router')

var authRouter = require('./routes/auth_router')

var productRouter = require('./routes/product_router')

var authMiddleware = require('./middlewares/auth_middleware')

var port = 3000;

app.set('view engine', 'pug');

app.set('views', './views');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser('process.env.SESSION_SECRET')); // Signed Cookie: tăng tính bảo mật, chống truy cập bất hợp pháp

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('view', {
        name: 'TAO',
    });
});


app.use('/users', authMiddleware.requireAuth, userRouter);

app.use('/products', productRouter);

app.use('/auth', authRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})