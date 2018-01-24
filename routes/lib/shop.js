/**
 * Created by momo on 2018/1/4.
 */
import express from "express";
import { shopclass } from "../../Controller/shop/shop";
const shop = new shopclass;
let router = express.Router();
router.post('/getAllshop', (req, res, next) => {
    shop.getAll(req, res, next);
});
router.post('/SaveRecord', (req, res, next) => {
    shop.Save(req, res, next);
});
router.post('/DeleteRecord', (req, res, next) => {
    shop.Delete(req, res, next);
});
module.exports = router;
