"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by momo on 2018/1/8.
 */
var express_1 = require("express");
var cart_1 = require("../../Controller/cart/cart");
var router = express_1.default.Router();
router.post('/getAllCart', function (req, res, next) {
    cart_1.default.getAll(req, res, next);
});
router.post('/getCart', function (req, res, next) {
    cart_1.default.getOne(req, res, next);
});
router.post('/Delect', function (req, res, next) {
    cart_1.default.DelectCart(req, res, next);
});
router.post('/Save', function (req, res, next) {
    cart_1.default.Save(req, res, next);
});
module.exports = router;
