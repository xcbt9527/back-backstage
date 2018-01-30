"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by momo on 2018/1/8.
 */
var express_1 = require("express");
var classification_1 = require("../../Controller/classification/classification");
var classification = new classification_1.classificationclass();
var router = express_1.default.Router();
/**
 * 获取所有分类
 */
router.post('/getAllclassification', function (req, res, next) {
    classification.getAll(req, res, next);
});
/**
 * 获树状结构
 */
router.post('/getTreeclassification', function (req, res, next) {
    classification.getAll(req, res, next);
});
/**
 * 获取这此条分类
 */
router.post('/getclassification', function (req, res, next) {
    classification.getOne(req, res, next);
});
/**
 * 删除此条分类
 */
router.post('/Delectclassification', function (req, res, next) {
    classification.Delect(req, res, next);
});
/**
 * 保存此条分类
 */
router.post('/Saveclassification', function (req, res, next) {
    classification.Save(req, res, next);
});
module.exports = router;
