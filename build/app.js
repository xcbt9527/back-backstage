"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var shops = require('./routes/shop');
var carts = require('./routes/cart');
var user_js_1 = require("./Controller/user/user.js");
var app = express();
// view engine setup
app.set('dist', path.join(__dirname, 'dist'));
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist'), { maxAge: 1000 * 60 * 60 }));
app.use(function (req, res, next) {
    console.log(req.url);
    if (req.url === '/api/user/login' || req.url === '/api/user/register') {
        next();
    }
    else {
        //验证是否已登录
        user_js_1.default.islogin(req, res, next);
    }
});
app.use('/api/user/', users); //用户表
app.use('/api/shop/', shops); //商品表
app.use('/api/cart/', carts); //购物车
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
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
