"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by momo on 2018/1/4.
 */
var express_1 = require("express");
var shop_1 = require("../../Controller/shop/shop");
var shop = new shop_1.shopclass;
var router = express_1.default.Router();
router.post('/getAllshop', function (req, res, next) {
    shop.getAll(req, res, next);
});
router.post('/SaveRecord', function (req, res, next) {
    shop.Save(req, res, next);
});
router.post('/DeleteRecord', function (req, res, next) {
    shop.Delete(req, res, next);
});
module.exports = router;
