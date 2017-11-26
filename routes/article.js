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
module.exports = router;
