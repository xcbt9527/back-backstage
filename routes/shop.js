/**
 * Created by momo on 2018/1/4.
 */
import express from "express";
import shop from "../Controller/shop/shop";
let router = express.Router();
router.post('/getAllshop', (req, res, next) => {
    shop.getAllshop(req, res, next);
});
router.post('/SaveRecord', (req, res, next) => {
    shop.SaveRecord(req, res, next);
});
router.post('/DeleteRecord', (req, res, next) => {
    shop.DeleteRecord(req, res, next);
});
module.exports = router;
