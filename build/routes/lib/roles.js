"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by momo on 2018/1/21.
 */
var express_1 = require("express");
var roles_1 = require("../../Controller/roles/roles");
var roles = new roles_1.rolesclass();
var router = express_1.default.Router();
router.post('/getAllroles', function (req, res, next) {
    roles.getAll(req, res, next);
});
router.post('/getTreeroles', function (req, res, next) {
    roles.getTree(req, res, next);
});
router.post('/getroles', function (req, res, next) {
    roles.getOne(req, res, next);
});
router.post('/Delectroles', function (req, res, next) {
    roles.Delect(req, res, next);
});
router.post('/Saveroles', function (req, res, next) {
    roles.Save(req, res, next);
});
module.exports = router;
