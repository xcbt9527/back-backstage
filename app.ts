let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let index = require('./routes/lib/index');
let users = require('./routes/lib/users');
let shops = require('./routes/lib/shop');
let carts = require('./routes/lib/cart');
let menu = require('./routes/lib/menu');
let roles = require('./routes/lib/roles');
let classification = require('./routes/lib/classification');
import user from "./Controller/user/user.js";
let app = express();

// view engine setup
app.set('dist', path.join(__dirname, 'dist'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist'), {maxAge: 1000 * 60 * 60}));
app.use(function (req, res, next) {
    if (req.url === '/api/user/login' || req.url === '/api/user/register') {
        next();
    } else {
        //验证是否已登录
        user.islogin(req, res, next);
    }
});

app.use('/api/user/', users);   //用户表
app.use('/api/shop/', shops);   //商品表
app.use('/api/cart/', carts);   //购物车
app.use('/api/classification/', classification);   //分类
app.use('/api/menu/', menu);   //菜单栏
app.use('/api/roles/', roles);   //权限
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
