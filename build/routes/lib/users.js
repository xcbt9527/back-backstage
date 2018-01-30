"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = require("../../Controller/user/user");
var user = new user_1.userclass();
var router = express_1.default.Router();
router.post('/login', function (req, res, next) {
    user.login(req, res, next);
});
router.post('/getAlluser', function (req, res, next) {
    user.getAll(req, res, next);
});
router.post('/SaveRecord', function (req, res, next) {
    user.Save(req, res, next);
});
router.post('/DeleteRecord', function (req, res, next) {
    user.Delete(req, res, next);
});
router.post('/ModifyRecord', function (req, res, next) {
    user.ModifyRecord(req, res, next);
});
router.post('/register', function (req, res, next) {
    user.register(req, res, next);
});
module.exports = router;
