"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/lib/index.ts');
var users = require('./routes/lib/users.ts');
var shops = require('./routes/lib/shop.ts');
var carts = require('./routes/lib/cart.ts');
var menu = require('./routes/lib/menu.ts');
var roles = require('./routes/lib/roles.ts');
var classification = require('./routes/lib/classification.ts');
var publics = require("./routes/public.ts");
var notepad = require("./routes/lib/notepad.ts");
var bookframework = require("./routes/lib/bookframework/bookframework.ts");
var chapter = require("./routes/lib/bookframework/chapter.ts");
var exercuses = require("./routes/lib/bookframework/exercuses.ts");
var user_js_1 = require("./Controller/user/user.js");
var user = new user_js_1.userclass();
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
    if (req.url === '/api/user/login' || req.url === '/api/user/register') {
        next();
    }
    else {
        //验证是否已登录
        user.islogin(req, res, next);
    }
});
app.use('/api/public/', publics); //公用
app.use('/api/user/', users); //用户表
app.use('/api/shop/', shops); //商品表
app.use('/api/cart/', carts); //购物车
app.use('/api/classification/', classification); //分类
app.use('/api/menu/', menu); //菜单栏
app.use('/api/roles/', roles); //权限
app.use('/api/notepad/', notepad); //记事本
app.use('/api/bookframework/', bookframework); //书本类型
app.use('/api/chapter/', chapter); //章节
app.use('/api/exercuses/', exercuses); //练习题
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
