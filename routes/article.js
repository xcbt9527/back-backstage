/**
 * Created by momo on 2017/11/26.
 */
import express from "express";
import article from "../Controller/article/article";
let router = express.Router();
//获取所有文章
router.post('/articleall', (req, res, next) => {
    article.articleall(req, res, next);
});
//获取单条文章
router.post('/getRecord', (req, res, next) => {
    article.getRecord(req, res, next);
});

//保存文章
router.post('/SaveRecord', (req, res, next) => {
    article.SaveRecord(req, res, next);
});

//删除文章
router.post('/delectRecord', (req, res, next) => {
    article.delectRecord(req, res, next);
});
module.exports = router;
