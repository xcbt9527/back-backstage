/**
 * Created by momo on 2018/1/8.
 */
import express from "express";
import { classificationclass } from "../../Controller/classification/classification";
const classification = new classificationclass();
let router = express.Router();
/**
 * 获取所有分类
 */
router.post('/getAllclassification', (req, res, next) => {
    classification.getAll(req, res, next);
});
/**
 * 获树状结构
 */
router.post('/getTreeclassification', (req, res, next) => {
    classification.getTree(req, res, next);
});
/**
 * 获取这此条分类
 */
router.post('/getclassification', (req, res, next) => {
    classification.getOne(req, res, next);
});
/**
 * 删除此条分类
 */
router.post('/Delectclassification', (req, res, next) => {
    classification.Delect(req, res, next);
});
/**
 * 保存此条分类
 */
router.post('/Saveclassification', (req, res, next) => {
    classification.Save(req, res, next);
});
module.exports = router;
