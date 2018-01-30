"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by momo on 2018/1/21.
 */
var express_1 = require("express");
var menu_1 = require("../../Controller/menu/menu");
var menu = new menu_1.menuclass();
var router = express_1.default.Router();
router.post('/getAllmenu', function (req, res, next) {
    menu.getAll(req, res, next);
});
router.post('/getTreemenu', function (req, res, next) {
    menu.getTree(req, res, next);
});
router.post('/getmenu', function (req, res, next) {
    menu.getOne(req, res, next);
});
router.post('/Delectmenu', function (req, res, next) {
    menu.Delect(req, res, next);
});
router.post('/Savemenu', function (req, res, next) {
    menu.Save(req, res, next);
});
module.exports = router;
